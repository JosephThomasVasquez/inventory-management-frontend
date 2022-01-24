import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "../dashboard/Dashboard";
import CategoriesList from "../categories/CategoriesList";
import ItemsList from "../items/ItemsList";

const Routing = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route exact path="/categories" element={<CategoriesList />} />
        <Route
          exact
          path="/categories/:categoryId/items"
          element={<ItemsList />}
        />
      </Routes>
    </>
  );
};

export default Routing;
