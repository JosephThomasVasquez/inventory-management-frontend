import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/create`, { state: category });
  };

  return (
    <div className="card shadow my-2">
      {!category ? (
        <Loader />
      ) : (
        <div>
          <div className="card-header py-0">
            <div className="h3">{category.name}</div>
          </div>
          <div className="card-body">
            <p className="card-text">{category.description}</p>

            <Link
              className="col col-sm-3 col-md-2 col-lg-2 btn btn-primary btn-fixed-main"
              to={`/categories/${category.id}/items`}
            >
              <div className="">
                <i className="fa-solid fa-boxes-stacked"></i> Items
              </div>
            </Link>
            <button
              className="col col-sm-3 btn btn-primary btn-fixed-main ms-3"
              onClick={handleClick}
            >
              <div className="">
                <i className="fa fa-plus"></i> Add Item
              </div>
            </button>

            <Link
              className="col-2 col-sm-2 col-md-2 col-lg-2 btn btn-outline-primary btn-fixed-edit"
              to={`/categories/${category.id}/edit`}
            >
              <div className="">
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
