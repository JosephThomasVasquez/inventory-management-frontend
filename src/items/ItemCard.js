import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="card shadow my-2 item-card">
      <div className="card-header py-2">
        <div className="h6 my-1">
          {item.name.length > 32
            ? `${item.name.substring(0, 32)} ...`
            : item.name}
        </div>
      </div>
      <div className="card-body">
        <p className="card-text item-text">
          {item.description.length > 100
            ? `${item.description.substring(0, 100)} ...`
            : item.description}
        </p>
        <div className="row">
          <div className="col-6 h4">${item.price}</div>
          <div className="col-6">Qty: {item.quantity_in_stock}</div>
        </div>

        <Link className="col-4 btn btn-primary" to={`/items/${item.id}`}>
          <div className="">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> View
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
