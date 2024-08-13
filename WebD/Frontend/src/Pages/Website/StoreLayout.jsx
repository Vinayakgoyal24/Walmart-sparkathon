import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/MainContext";
import GradientBar from "../../Components/Website/GradientBar";
import { CiSearch } from "react-icons/ci";
const StoreLayout = () => {
  const {
    Colors: stacks,
    fetchColor,
    products,
    fetchProduct,
    fetchBrand,
    Brand: brands,
    API_BASE_URL,
    frequency,
    fetchFrequency,
  } = useContext(context);

  const [selectedStackId, setSelectedStackId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when this component mounts
  }, []);
  useEffect(() => {
    fetchColor();
    fetchProduct();
    fetchBrand();
    fetchFrequency();
  }, [frequency]);

  let stackIndex = 0;

  const handleStackClick = (stackId) => {
    setSelectedStackId(stackId);
    const prodInStock = products.filter((prod) => {
      console.log(prod.stack_id._id);

      return prod.stack_id._id === stackId;
    });
    setFilteredProducts(prodInStock);
    setIsProductMenuOpen(true); // Open product menu when a stack is clicked
  };

  const closeProductMenu = () => {
    setIsProductMenuOpen(false); // Close product menu
  };

  const getStackBackgroundColor = (stackName) => {
    const stackFrequency = frequency.find((freq) => {
      // console.log(freq.stack)
      return freq.Stack === stackName;
    });
    // console.log(stackFrequency.ppm);
    // console.log(stackFrequency)
    if (stackFrequency) {
      const ppm = stackFrequency.ppm;

      // Default color gradient logic
      let color;
      if (ppm == 1) {
        color = "rgba(255, 210, 127, 1)"; // Black for ppm = 1
      } else if (ppm == 0) {
        color = "rgba(255, 243, 230, 1)"; // Red for ppm = 2
      } else if (ppm <= 10) {
        color = `rgba(255, 223, 186, ${ppm / 10})`; // Very light orange gradient for lower ppm values
      } else if (ppm <= 20) {
        color = `rgba(255, 194, 129, ${(ppm - 10) / 10})`; // Light orange gradient for medium ppm values
      } else if (ppm <= 30) {
        color = `rgba(255, 165, 0, ${(ppm - 20) / 10})`; // Medium orange gradient for higher ppm values
      } else {
        color = `rgba(255, 140, 0, 1)`; // Solid orange for ppm values above 30
      }

      return { backgroundColor: color };
    }

    return { backgroundColor: "rgba(255, 255, 255, 1)" }; // Default white background for no data
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on search query
    if (query) {
      const suggestions = products.filter((prod) =>
        prod.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
      setIsDropdownOpen(true);
    } else {
      setFilteredSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setFilteredSuggestions([]);
    setIsDropdownOpen(false);
    // Optionally, you could also open the product menu or navigate to the product detail page
  };

  return (
    <div className="w-full h-screen mt-36 mb-4 ml-4 mr-4 relative">
      {/* Search Bar */}
      <div className="mb-4 w-full relative ">
        <div className="w-1/2 flex border border-[#0071DC] rounded-3xl p-2 mx-auto mt-4">
          <CiSearch className="text-3xl font-black" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full border-none focus:outline-none focus:ring-0"
          />
        </div>
        {isDropdownOpen && filteredSuggestions.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-b-xl shadow-lg z-10">
            {filteredSuggestions.map((prod) => (
              <div
                key={prod._id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(prod)}
              >
                {prod.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <GradientBar />
      <div className="h-auto mx-auto bg-slate-300 p-4 rounded-lg shadow-lg overflow-auto"></div>
      <div className="w-full h-10 bg-gray-300">
        <div className="w-8 h-full mx-auto text-center ">ENTRANCE</div>
      </div>
      <div className="h-full mx-auto bg-slate-300 p-4 rounded-lg shadow-lg overflow-auto">
        <div className="flex flex-col justify-center items-center gap-12">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex w-full gap-8 relative ">
              {/* Left Wing */}
              <div className="flex flex-col flex-1 gap-1 relative border p-4 rounded-lg bg-white shadow-md dp">
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-center p-1 ">
                  <div className="text-lg font-bold rotate-90 text-gray-400 p-1 ">{`Row-${
                    rowIndex + 1
                  }-L`}</div>
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => {
                    const stack = stacks[stackIndex];
                    if (stack) {
                      const stackId = stack._id;
                      const stackName = stack.name;
                      // console.log(stackName);
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          style={getStackBackgroundColor(stackName)}
                          className="border p-4 rounded-lg shadow-sm flex-1 text-center cursor-pointer dp"
                          onClick={() => handleStackClick(stackId)}
                        >
                          Stack {stackIndex}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => {
                    const stack = stacks[stackIndex];
                    if (stack) {
                      const stackId = stack._id;
                      const stackName = stack.name;
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          style={getStackBackgroundColor(stackName)} // Apply dynamic background color
                          className="border p-4 rounded-lg shadow-sm flex-1 text-center cursor-pointer dp"
                          onClick={() => handleStackClick(stackId)}
                        >
                          Stack {stackIndex}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Right Wing */}
              <div className="flex flex-col flex-1 gap-1 relative border p-4 rounded-lg bg-white shadow-md dp">
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-center p-1">
                  <div className="text-lg font-bold rotate-90 text-gray-400 p-1">{`Row-${
                    rowIndex + 1
                  }-R`}</div>
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => {
                    const stack = stacks[stackIndex];
                    if (stack) {
                      const stackId = stack._id;
                      const stackName = stack.name;
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          style={getStackBackgroundColor(stackName)} // Apply dynamic background color
                          className="border p-4 rounded-lg shadow-sm flex-1 text-center cursor-pointer dp"
                          onClick={() => handleStackClick(stackId)}
                        >
                          Stack {stackIndex}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => {
                    const stack = stacks[stackIndex];
                    if (stack) {
                      const stackId = stack._id;
                      const stackName = stack.name;
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          style={getStackBackgroundColor(stackName)} // Apply dynamic background color
                          className="border p-4 rounded-lg shadow-sm flex-1 text-center cursor-pointer dp"
                          onClick={() => handleStackClick(stackId)}
                        >
                          Stack {stackIndex}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Products */}
      {isProductMenuOpen && filteredProducts.length > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 border p-4 rounded-3xl shadow-2xl w-11/12 lg:w-1/2 h-2/3 overflow-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Products in Selected Stack</h3>
            <button
              className="text-[#FEBB0C] text-4xl font-bold rounded-full p-1 hover:bg-[#002D58] hover:rotate-90"
              onClick={closeProductMenu}
            >
              &times;
            </button>
          </div>
          <div className="flex flex-wrap gap-2 overflow-auto rounded-2xl mt-3">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod, index) => {
                  return (
                    <tr
                      key={prod._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-2">
                        <img
                          src={`${API_BASE_URL}/Images/Product/${prod.image}`}
                          alt=""
                          className="object-scale-down w-28 ml-3"
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {prod.name}
                        <hr />
                        <div className="flex items-center">
                          <h1 className="line-through opacity-50 mt-3">
                            ₹ {prod.price}
                          </h1>
                          <h1 className="mt-3 ml-2 text-xl">
                            ₹ {prod.discount_price}
                          </h1>
                        </div>
                      </th>
                      <td className="px-6 py-4">{prod.category_id.name}</td>
                      <td className="px-6 py-4">{prod.brand_id.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreLayout;
