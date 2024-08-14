import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/MainContext";
import axios from "axios";

function Dashboard() {
  const { fetchProduct, products, API_BASE_URL } = useContext(context);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleProductClick = async (product) => {
    setSelectedProduct(product);

    if (!selectedDate) {
      console.error("Date not selected");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/save-date`, {
        date: selectedDate,
        productName: product.name,
      });
      console.log(
        "Date and product name successfully saved to file:",
        response.data
      );
    } catch (error) {
      console.error("Error saving date and product name:", error);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="bg-[#f9f9f9] w-full min-h-screen overflow-auto rounded-3xl p-5 md:m-2">
      <div className="flex justify-between items-center mb-2 text-2xl">
        <h1 className="bg-[#FEBB0C] rounded-3xl font-extrabold px-4 py-2 text-2xl md:text-5xl dp mb-2">
          Dashboard
        </h1>
      </div>
      {/* <hr className="border border-black mb-4" /> */}
      <div className="mb-4">
        <label
          htmlFor="date-picker"
          className="mr-2 text-lg font-semibold text-[#0071DC]"
        >
          Select Date:
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-wrap gap-4 overflow-auto max-h-[750px] rounded-3xl">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="border border-gray-300 rounded-3xl p-4 flex flex-col items-center bg-blue-50 hover:bg-blue-100  w-[300px] h-[350px] cursor-pointer dp overflow-auto"
          >
            <img
              src={API_BASE_URL + "/Images/Product/" + product.image}
              alt={product.name}
              className="object-scale-down w-2/3 max-h-48"
            />
            <h2 className="font-bold text-4xl text-[#0071DC]">
              {product.name}
            </h2>
            <h2 className="text-lg font-semibold text-gray-600">
              Category: {product.category_id.name}
            </h2>     
            <h2 className="text-lg font-semibold text-gray-600">
              Brand: {product.brand_id.name}
            </h2>
            <h2 className="text-lg font-semibold text-gray-600">
              Stack number: {product.stack_id.name}
            </h2>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 dp">
          <div className="bg-white rounded-lg w-1/2 h-2/3 p-4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-5xl text-[#FEBB0C] hover:bg-[#002D58] rounded-full hover:rotate-90 mr-4"
            >
              &times;
            </button>
            <div className="flex flex-col items-center h-full overflow-auto">
              <div className="bg-blue-500 px-4 py-2 rounded-3xl dp">
                <h1 className="text-3xl font-black text-[#FEBB0C]">
                  Product Data Analytics
                </h1>
              </div>
              <img
                src={
                  API_BASE_URL +
                  "/Images/graphs/ImageData20240813_1006_correlation.png"
                }
                className=""
                alt="Correlation"
              />
              <img
                src={
                  API_BASE_URL +
                  "/Images/graphs/ImageData20240813_1006_frequency.png"
                }
                className=""
                alt="Frequency"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
