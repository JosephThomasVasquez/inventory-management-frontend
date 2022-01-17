import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import CategoriesList from "../categories/CategoriesList";

const Routing = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/categories" element={<CategoriesList />} />
      </Routes>
    </>
  );
};

export default Routing;
