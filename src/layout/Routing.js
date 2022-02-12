import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { listCategories } from "../utils/api";
import Layout from "./Layout";
import Dashboard from "../dashboard/Dashboard";
import CategoriesList from "../categories/CategoriesList";
import ItemsList from "../items/ItemsList";
import ItemDetails from "../items/ItemDetails";
import ItemForm from "../items/ItemForm";
import Login from "../login/Login";
import Register from "../register/Register";
import ErrorAlert from "../errors/ErrorAlert";

const Routing = () => {
  const [errors, setErrors] = useState(null);
  const [categories, setCategories] = useState([]);

  const errorHandler = (errorFound = null) => {
    console.log("error", errorFound);
    if (errorFound && errorFound !== "clearErrors") {
      setErrors(errorFound);
    } else if (errorFound === "clearErrors") {
      setErrors(null);
    }
  };

  const loadCategories = () => {
    const abortController = new AbortController();
    setCategories(null);
    listCategories(abortController.signal).then(setCategories).catch(setErrors);
    return () => abortController.abort();
  };

  useEffect(loadCategories, []);

  return (
    <>
      <Layout />
      <ErrorAlert errors={errors} />
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard categories={categories} errorHandler={errorHandler} />
          }
        />

        <Route path="/" element={<Navigate replace to="/dashboard" />} />

        <Route
          exact
          path="/categories"
          element={
            <CategoriesList
              categories={categories}
              errorHandler={errorHandler}
            />
          }
        />

        <Route
          exact
          path="/categories/:categoryId/items"
          element={<ItemsList />}
        />

        <Route exact path="/items/:itemId" element={<ItemDetails />} />

        <Route
          exact
          path="/items/create"
          element={
            <ItemForm categories={categories} errorHandler={errorHandler} />
          }
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
