import React from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import "./item.style.css";

const ItemCard = ({ item }) => {
  return (
    <div className="card shadow my-2">
      {!item ? (
        <Loader />
      ) : (
        <div>
          <div className="card-header py-2">
            <div className="h6 my-1">
              {item.name.length > 32
                ? `${item.name.substring(0, 32)} ...`
                : item.name}
            </div>
          </div>
          <div className="card-body">
            <p className="card-text item-text">
              {item.main_imageUrl ? (
                <img
                  src={item.main_imageUrl}
                  alt="Main image"
                  className="card-image"
                />
              ) : (
                "No Image"
              )}
            </p>

            <div className="col h4">${item.price}</div>

            <div className="col my-2">
              Qty:{" "}
              <span className="fw-bold text-primary">
                {item.quantity_in_stock}
              </span>
            </div>

            <div className="d-flex justify-content-start">
              <Link
                className="col-4 btn btn-primary btn-fixed-main me-1"
                to={`/items/${item.id}`}
              >
                <div className="">
                  <i className="fa-solid fa-eye"></i> View
                </div>
              </Link>

              <Link
                className="col-2 btn btn-outline-primary btn-fixed-edit ms-3"
                to={`/items/${item.id}/edit`}
              >
                <div className="">
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
