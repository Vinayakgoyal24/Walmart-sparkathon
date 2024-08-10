import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/MainContext";
import { NavLink } from "react-router-dom";

const StoreLayout = () => {
  const {
    Colors: stacks,
    fetchColor,
    products,
    fetchProduct,
    fetchBrand,
    Brand: brands,
    API_BASE_URL,
  } = useContext(context);

  const [selectedStackId, setSelectedStackId] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  useEffect(() => {
    fetchColor();
    fetchProduct();
    fetchBrand();
  }, []);

  let stackIndex = 0;

  const handleStackClick = (stackId) => {
    setSelectedStackId(stackId);
    const prodInStock = products.filter((prod) => prod.stack_id === stackId);
    setFilteredProducts(prodInStock);
    setIsProductMenuOpen(true); // Open product menu when a stack is clicked
  };

  const handleBrandClick = (brandId) => {
    const productsOfBrand = products.filter(
      (product) =>
        product.stack_id === selectedStackId && product.brand_id === brandId
    );
    setFilteredProducts(productsOfBrand);
  };

  const closeProductMenu = () => {
    setIsProductMenuOpen(false); // Close product menu
  };

  return (
    <div className="w-full h-screen mt-4 mb-4 ml-4 mr-4 relative">
      <div className="w-full h-10 bg-slate-200">
        <div className="w-8 h-full mx-auto text-center">ENTRANCE</div>
      </div>
      <div className="h-full mx-auto bg-slate-300 p-4 rounded-lg shadow-lg overflow-auto">
        <div className="flex flex-col justify-center items-center gap-12">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex w-full gap-8 relative">
              {/* Left Wing */}
              <div className="flex flex-col flex-1 gap-1 relative border p-4 rounded-lg bg-white shadow-md">
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-center p-1">
                  <div className="text-lg font-bold rotate-90 text-gray-400 p-1">{`Row-${
                    rowIndex + 1
                  }-L`}</div>
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => {
                    const stack = stacks[stackIndex];
                    if (stack) {
                      const stackId = stack._id;
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center cursor-pointer"
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
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center cursor-pointer"
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
              <div className="flex flex-col flex-1 gap-1 relative border p-4 rounded-lg bg-white shadow-md">
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
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center cursor-pointer"
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
                      stackIndex++;

                      return (
                        <div
                          key={stackId}
                          id={`Stack-${stackId}`}
                          className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center cursor-pointer"
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
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 border p-4 rounded-3xl shadow-2xl w-11/12 lg:w-1/2 h-2/3 overflow-auto ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Products in Selected Stack</h3>
            <button
              className=" text-[#FEBB0C] text-4xl font-bold rounded-full p-1 hover:bg-[#002D58] hover:rotate-90"
              onClick={closeProductMenu}
            >
              &times;
            </button>
          </div>
          <div className="flex flex-wrap gap-2 overflow-auto rounded-2xl mt-3">
            <table class="w-full csm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Brand
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod, index) => {
                  return (
                    <tr
                      key={prod._id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td class="py-2">
                        {/* {prod.image} */}
                        <img
                          src={API_BASE_URL + "/Images/Product/" + prod.image}
                          alt=""
                          className="object-scale-down w-28 ml-3"
                        />
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                        {/* {prod.} */}
                      </th>
                      <td class="px-6 py-4">{prod.category_id.name}</td>
                      {/* <td class="px-6 py-6 grid grid-cols-2 ">
                    {prod.color.map((c, i) => {
                      return (
                        <td
                          className="m-1 dp block px-4 py-4 rounded-full h-2 w-2 border-2 border-black"
                          style={{ backgroundColor: c.code }}
                        ></td>
                      );
                    })}
                  </td> */}
                      <td class="px-6 py-4">{prod.brand_id.name}</td>
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
