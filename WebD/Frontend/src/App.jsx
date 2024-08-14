import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminMain from "./Pages/Adminn/Main";
import WebsiteMain from "./Pages/Website/Main";
import Home from "./Pages/Website/Home";

import Dashboard from "./Pages/Adminn/Dashboard";

import CategoryView from "./Pages/Adminn/Category/View";

import BrandView from "./Pages/Adminn/Brand/View";

import ProductsView from "./Pages/Adminn/Products/View";
import ProductsAdd from "./Pages/Adminn/Products/Add";
import ProductsEdit from "./Pages/Adminn/Products/Edit";

import ColorView from "./Pages/Adminn/Colors/View";
import ColorAdd from "./Pages/Adminn/Colors/Add";
import ColorEdit from "./Pages/Adminn/Colors/Edit";
import Store from "./Pages/Website/Store";
import Cart from "./Pages/Website/Cart";
import Checkout from "./Pages/Website/Checkout";
import MyOrder from "./Pages/Website/MyOrder";
import OrderPlaced from "./Pages/OrderPlaced";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import QrScanner from "./Components/Website/QrScanner";
import { useDispatch } from "react-redux";
import { lsToCart } from "./reducers/CartSlice";
import { lsLogin } from "./reducers/UserReducer";
import StoreLayout from "./Pages/Website/StoreLayout";
import AdminLayout from "./Pages/Adminn/AdminLayout";
function App() {
  const dispatcher = useDispatch();
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    dispatcher(lsToCart());
    dispatcher(lsLogin());
  }, [dispatcher]);


  const routes = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteMain />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/store/:category_slug?",
          element: <Store />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/my-orders",
          element: <MyOrder />,
        },
        {
          path: "/qr-scanner",
          element: <QrScanner />,
        },
        {
          path: "/store-layout/:storeId",
          element: <StoreLayout />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
    {
      path: "/order-placed/:order_id",
      element: <OrderPlaced />,
    },
    {
      path: "/admin",
      element: <AdminMain />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "category",
          element: <CategoryView />,
        },
        {
          path: "product",
          element: <ProductsView />,
        },
        {
          path: "product/add",
          element: <ProductsAdd />,
        },
        {
          path: "product/edit/:id",
          element: <ProductsEdit />,
        },
        {
          path: "stacks",
          element: <ColorView />,
        },
        {
          path: "stacks/add/",
          element: <ColorAdd />,
        },
        {
          path: "stacks/edit/:id",
          element: <ColorEdit />,
        },
        {
          path: "brand",
          element: <BrandView />,
        },
        {
          path: "layout",
          element: <AdminLayout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
