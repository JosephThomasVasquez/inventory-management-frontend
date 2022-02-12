import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/create`, { state: category });
  };

  return (
    <div className="card shadow my-2">
      <div className="card-header py-0">
        <div className="h3">{category.name}</div>
      </div>
      <div className="card-body">
        <p className="card-text">{category.description}</p>

        <Link
          className="col-2 btn btn-primary"
          to={`/categories/${category.id}/items`}
        >
          <div className="">Items</div>
        </Link>
        <button className="col-2 btn btn-primary ms-3" onClick={handleClick}>
          <div className="">Add Item</div>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
