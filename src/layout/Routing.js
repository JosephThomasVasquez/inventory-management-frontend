import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { listCategories, listAllItems } from "../utils/api";
import Layout from "./Layout";
import Dashboard from "../dashboard/Dashboard";
import CategoriesList from "../categories/CategoriesList";
import CategoryForm from "../categories/CategoryForm";
import ItemsList from "../items/ItemsList";
import ItemDetails from "../items/ItemDetails";
import ItemForm from "../items/ItemForm";
import SearchItemsList from "../search/SearchItemsList";
import Login from "../login/Login";
import Register from "../register/Register";
import ErrorAlert from "../errors/ErrorAlert";

const Routing = () => {
  const location = useLocation();

  const [errors, setErrors] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const errorHandler = (errorFound = null) => {
    console.log("error", errorFound);
    if (errorFound && errorFound !== "clearErrors") {
      setErrors(errorFound);
    } else if (errorFound === "clearErrors") {
      setErrors(null);
    }
  };

  const loadCategories = () => {
    console.log("loading categories...");
    const abortController = new AbortController();
    setCategories(null);
    listCategories(abortController.signal).then(setCategories).catch(setErrors);
    return () => abortController.abort();
  };

  const loadItems = () => {
    const abortController = new AbortController();
    setItems(null);
    listAllItems(abortController.signal).then(setItems).catch(setErrors);
    return () => abortController.abort();
  };

  useEffect(loadCategories, [location]);
  useEffect(loadItems, [location]);

  return (
    <>
      <Layout />
      <ErrorAlert errors={errors} />
      <Routes>
        {/* DASHBOARD */}
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard
              categories={categories}
              items={items}
              errorHandler={errorHandler}
            />
          }
        />

        {/* DASHBOARD REDIRECT */}
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

        {/* CATEGORIES */}
        <Route
          exact
          path="/categories/create"
          element={
            <CategoryForm categories={categories} errorHandler={errorHandler} />
          }
        />

        <Route
          exact
          path="/categories/:categoryId/items"
          element={<ItemsList errorHandler={errorHandler} />}
        />

        {/* ITEMS */}
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
          path="/items/:itemId/edit"
          element={
            <ItemForm categories={categories} errorHandler={errorHandler} />
          }
        />

        {/* SEARCH ITEMS */}
        <Route
          exact
          path="/search"
          element={<SearchItemsList errorHandler={errorHandler} />}
        />

        {/* USER */}
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
