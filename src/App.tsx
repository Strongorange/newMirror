import React from "react";
import Home from "./screens/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
