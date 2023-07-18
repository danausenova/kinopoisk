import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import MovieAddPage from "../pages/MovieAddPage";
import EditPage from "../pages/EditPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<MovieAddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
