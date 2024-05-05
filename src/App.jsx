import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import MainLayout from "./MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import { Suspense } from "react";
import Login from "./Pages/Login/Login";

function App() {
  const routes = [
    {
      element: <MainLayout />,
      path: "/",
      children: [
        { element: <Home />, path: "/home" },
        { element: <Login />, path: "/login" },
      ],
    },
  ];
  const Elements = () => {
    return useRoutes(routes);
  };
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Elements />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
