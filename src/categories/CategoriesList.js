import React, { useState, useEffect } from "react";
import { listCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategoriesList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setCategories(null);
    listCategories(abortController.signal).then(setCategories).catch(setErrors);
    return () => abortController.abort();
  }, []);

  const categoryLinks = () => {
    console.log("categories", categories);
    return categories.map((category, index) => (
      <CategoryCard key={category.id} category={category} />
    ));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Categories</h2>
        </div>
        <button
          type="button"
          className="btn btn-primary col-1"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <div className="col-6">{categories && categoryLinks()}</div>
    </div>
  );
};

export default CategoriesList;
