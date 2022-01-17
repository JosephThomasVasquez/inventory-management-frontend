import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import CategoriesList from "../categories/CategoriesList";
import ItemsList from "../items/ItemsList";

const Routing = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route exact path="/" element={<Home />} />
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
