import React, { useState, useEffect } from "react";
import { listCategories } from "../utils/api";

const CategoriesList = () => {
  const [categories, setCategories] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setCategories(null);
    listCategories(abortController.signal).then(setCategories).catch(setErrors);
    return () => abortController.abort();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Categories</h2>
        </div>
      </div>
      <div className="row">{JSON.stringify(categories)}</div>
    </div>
  );
};

export default CategoriesList;
