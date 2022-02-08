import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "../dashboard/Dashboard";
import CategoriesList from "../categories/CategoriesList";
import ItemsList from "../items/ItemsList";
import ItemForm from "../items/ItemForm";

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
        <Route
          exact
          path="/categories/:categoryId/create"
          element={<ItemForm />}
        />
      </Routes>
    </>
  );
};

export default Routing;
