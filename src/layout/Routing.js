import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "../dashboard/Dashboard";
import CategoriesList from "../categories/CategoriesList";
import ItemsList from "../items/ItemsList";
import ItemForm from "../items/ItemForm";
import Login from "../login/Login";
import Register from "../register/Register";
import ErrorAlert from "../errors/ErrorAlert";

const Routing = () => {
  const [errors, setErrors] = useState(null);

  const errorHandler = (errorFound = null) => {
    console.log("error", errorFound);
    if (errorFound && errorFound !== "clearErrors") {
      setErrors(errorFound);
    } else if (errorFound === "clearErrors") {
      setErrors(null);
    }
  };

  return (
    <>
      <Layout />
      <ErrorAlert errors={errors} />
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={<Dashboard errorHandler={errorHandler} />}
        />

        <Route path="/" element={<Navigate replace to="/dashboard" />} />

        <Route
          exact
          path="/categories"
          element={<CategoriesList errorHandler={errorHandler} />}
        />

        <Route
          exact
          path="/categories/:categoryId/items"
          element={<ItemsList />}
        />

        <Route
          exact
          path="/categories/:categoryId/create"
          element={<ItemForm errorHandler={errorHandler} />}
        />

        <Route
          exact
          path="/login"
          element={<Login errorHandler={errorHandler} />}
        />
        <Route
          exact
          path="/register"
          element={<Register errorHandler={errorHandler} />}
        />
      </Routes>
    </>
  );
};

export default Routing;
