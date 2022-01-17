import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listItems } from "../utils/api";

const ItemsList = () => {
  const { categoryId } = useParams();

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

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Items</h2>
        </div>
      </div>
      <div className="col-3">{categoryId}</div>
      {JSON.stringify(items)}
    </div>
  );
};

export default ItemsList;
