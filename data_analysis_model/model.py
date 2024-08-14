import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import shap
from sklearn.cluster import AgglomerativeClustering, KMeans
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import os
import warnings
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Load the data
df = pd.read_csv(r"C:/Users/vishe/OneDrive/Desktop/Walmart/product_data.csv")

# Shuffle 'Discount' and 'Price' columns
df['Discount'] = np.random.permutation(df['Discount'])
df['Price'] = np.random.permutation(df['Price'])

# Extract data for a specific product
data = df[df['ProductID'] == 1006].iloc[:, [3, 4, 8]]

# Standardize the data
scaler = StandardScaler()
columns = data.columns
data = scaler.fit_transform(data)
data = pd.DataFrame(data, columns=columns)
odata = data.copy()

# Set environment variable to limit CPU usage
os.environ['LOKY_MAX_CPU_COUNT'] = '4'

# Define clustering methods
clustering_methods = {
    'AgglomerativeClustering': AgglomerativeClustering,
    'KMeans': KMeans
}

# Initialize variables for tracking the best model
best_model_name = ''
best_accuracy = 0
best_n_clusters = 2

# Iterate through clustering methods
for method_name, method in clustering_methods.items():
    warnings.filterwarnings("ignore", message="Could not find the number of physical cores")
    
    n_clusters = 2
    accuracy_improving = True

    while accuracy_improving:
        cluster = method(n_clusters=n_clusters) if method_name != 'DBSCAN' else method(eps=0.5, min_samples=2)
        labels_ = cluster.fit_predict(data[['Price', 'Discount']])
        data['Cluster'] = labels_

        X = data[['Price', 'Discount']]
        y = data['Cluster']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss', random_state=42)
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f'Clustering Method: {method_name}, Number of Clusters: {n_clusters} - Accuracy: {accuracy:.2f}')
        print(classification_report(y_test, y_pred))

        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_n_clusters = n_clusters
            best_model_name = method_name
            n_clusters += 1  # Increase the number of clusters
        else:
            accuracy_improving = False  # Stop if accuracy is no longer improving

print(f'\nBest Model: {best_model_name} with {best_n_clusters} clusters, Accuracy: {best_accuracy:.2f}')

# Re-cluster and train the best model
cluster = clustering_methods[best_model_name](n_clusters=best_n_clusters)
labels_ = cluster.fit_predict(data[['Price', 'Discount']])
data['Cluster'] = labels_

X = data[['Price', 'Discount']]
y = data['Cluster']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss', random_state=42)
model.fit(X_train, y_train)
explainer = shap.Explainer(model)
shap_values = explainer(X)
shap_values_df = pd.DataFrame(shap_values.values, columns=X.columns)
X_with_shap = X.copy()
X_with_shap[['Price_SHAP', 'Discount_SHAP']] = shap_values_df
X = X_with_shap

df = X
df['Price_SHAP_abs'] = df['Price_SHAP'].abs()
df['Discount_SHAP_abs'] = df['Discount_SHAP'].abs()

# Standardize SHAP values
scaler = StandardScaler()
df[['Price_SHAP_abs', 'Discount_SHAP_abs']] = scaler.fit_transform(df[['Price_SHAP_abs', 'Discount_SHAP_abs']])
df['Price_SHAP_abs'] = df['Price_SHAP_abs'].abs()
df['Discount_SHAP_abs'] = df['Discount_SHAP_abs'].abs()

# Assign categories based on SHAP values
df['Category'] = df.apply(lambda row: 'Price' if row['Price_SHAP_abs'] > row['Discount_SHAP_abs'] else 'Discount', axis=1)

# Get the current date
current_date = datetime.now().strftime('%Y%m%d')
custom_dir= r"C:/Users/vishe/OneDrive/Desktop/Walmart/ImageData"
os.makedirs(custom_dir,exist_ok=True)

# Plot the frequency of categories
plt.figure(figsize=(8, 6))
df['Category'].value_counts().plot(kind='bar', color='skyblue')
plt.title('Frequency of Categories')
plt.xlabel('Category')
plt.ylabel('Frequency')
plt.xticks(rotation=45)
plt.grid(axis='y', linestyle='--', alpha=0.7)
frequency_plot_filename = f"{custom_dir}{current_date}_1006_frequency.png"
plt.savefig(frequency_plot_filename)  # Save the plot with the date and product ID
plt.show()  # Display the plot

# Calculate and print frequencies
frequency = df['Category'].value_counts()
print(frequency)

# Plot the correlation matrix heatmap
correlation_matrix = odata.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Matrix Heatmap')
correlation_plot_filename = f"{custom_dir}{current_date}_1006_correlation.png"
plt.savefig(correlation_plot_filename)  # Save the plot with the date and product ID
plt.show()  # Display the plot
