import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listItems } from "../utils/api";

const ItemsList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setItems(null);
    listItems(categoryId, abortController.signal)
      .then(setItems)
      .catch(setErrors);
    return () => abortController.abort();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Items</h2>
        </div>
        <button
          type="button"
          className="btn btn-primary col-1"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <div className="col-3">{categoryId}</div>
      {JSON.stringify(items)}
    </div>
  );
};

export default ItemsList;
