# CrepDogCrew

CrepDogCrew is a comprehensive sneaker e-commerce platform built using the MERN (MongoDB, Express, React, Node.js) tech stack. This project features both an admin panel and a user panel, each designed with a set of robust functionalities that enable seamless management and shopping experiences. The project is developed using Vite for fast build times and optimized performance.

## Table of Contents

- [Features](#features)
  - [Admin Panel](#admin-panel)
  - [User Panel](#user-panel)
- [Technologies Used](#technologies-used)
- [Future Scope](#future-scope)
- [Installation](#installation)
- [Usage](#usage)

### Admin Panel

The admin panel is designed for efficient management of the website's content and operations. Key features include:

1. **Category and Color Management:**
   - Admins can add, edit, and delete categories and category images. These categories are dynamically displayed across the user panel.
   - Colors for the sneakers can be added, edited, and managed, allowing for a diverse product listing.
   
2. **Product Management:**
   - Products can be created by combining categories and colors. Admins can edit and delete products as needed.
   - A bestseller feature is available, where specific products can be highlighted as bestsellers.

3. **Order Management:**
   - A comprehensive dashboard displays all orders placed by users, complete with product details, order dates, order totals, and delivery addresses.
   - This data is fetched from the MongoDB database, providing real-time updates to the admin.

4. **Authentication and Security:**
   - The admin panel is accessible only through a secure login, requiring the correct email and password.
   - Environment variables are used to store sensitive information like admin credentials.

5. **File Uploads:**
   - The Dropzone package is utilized to facilitate image uploads for products directly through the admin panel.

6. **Alerts and Notifications:**
   - React-Toastify is used to display alerts and messages to the admin, ensuring smooth communication between the backend server and the admin interface.

### User Panel

The user panel is designed to provide a seamless shopping experience. Key features include:

1. **User Registration and Login:**
   - New users can register, enabling them to store their cart items and access past orders.
   - The login feature loads user details, including cart contents and past orders, from the MongoDB database.

2. **Password Security:**
   - User passwords are securely stored using the Cryptx package, ensuring encryption and secure password matching during login.
   - JWT authentication is implemented to generate a stateless token upon user login.

3. **Cart Management:**
   - Users can add items to their cart, with the cart data being saved in local storage and synced with the MongoDB database.
   - Cart contents are preserved across sessions, with seamless transition from local storage to database storage upon login.

4. **Product Browsing and Filtering:**
   - The landing page features a dynamic display of bestseller items, managed via the admin panel.
   - The store page allows users to filter products by categories and colors, with filters being sent through the URL to the backend, enabling persistent filtering even after page refreshes.

5. **Checkout Process:**
   - Users can manage their cart, adjust quantities, and proceed to checkout.
   - The checkout page auto-fills user information and allows for entry of delivery details, which are then stored in the database.
   - Orders are stored in the database, containing details such as products, shipping information, order total, payment mode, order status, and transaction ID (via Razorpay API).

6. **Payment Integration:**
   - Razorpay API is integrated for secure online payments, with transaction details being stored in the database, including payment status.

7. **User Profile Management:**
   - Users can edit their profile information, which is then updated in the database.
   - Past orders are displayed with complete details, allowing users to track their purchase history.

8. **Performance and Responsiveness:**
   - GSAP and ScrollTrigger are used for smooth animations on the landing page.
   - React Slick is used to create responsive sliders for categories on the landing and store pages.
   - Lazy loading is implemented for videos on the landing page, ensuring fast loading times.
   - The entire platform is responsive, providing a seamless experience across devices.


## Technologies Used

- **Frontend:** React, Redux, Redux Toolkit, Vite, GSAP, ScrollTrigger, React Slick, React-Toastify, Dropzone
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, Cryptx
- **Payment Integration:** Razorpay API
- **Build Tool:** Vite

### Future Scope

1. **Enhanced Analytics Dashboard:**
   - Expand the admin dashboard to include more detailed analytics, such as sales trends, customer demographics, and inventory management.

2. **Wishlist Feature:**
   - Implement a wishlist feature for users to save products they are interested in but not ready to purchase.

3. **Product Reviews and Ratings:**
   - Enable users to leave reviews and ratings for products, helping other customers make informed purchasing decisions.

4. **Advanced Filtering Options:**
   - Add more granular filtering options, such as price ranges, brands, and sizes, to enhance the user experience.

5. **Multi-Language Support:**
   - Introduce multi-language support to cater to a broader audience.

6. **SEO Optimization:**
   - Improve SEO for better visibility on search engines, driving more traffic to the website.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CrepDogCrew.git

```
2. Navigate to the project directory and install dependencies:
```sh
cd CrepDogCrew
npm install
```
3. Set up environment variables:

-Create a .env file in the root directory and add the necessary environment variables (e.g., database connection strings, API keys, etc.).

4.Run the development server:
```sh
npm run dev
```
5.Build for production:
```sh
npm run build
```
6.Start the production server:
```sh
npm run start
```
-This will start the application in production mode using the optimized build.

## Usage
**1)Admin Panel:**

-Access the admin panel by logging in with 
```sh
Email : admin@gmail.com
```
```sh
Password : admin123
```
**2)User Panel:**

-Users can register, log in, browse products, manage their cart, and complete purchases through the user panel.

# Walmart-Sparkathon
