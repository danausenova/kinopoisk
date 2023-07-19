import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import MovieItem from "../components/MovieItem";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
