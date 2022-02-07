import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="col-3">
      <div className="card shadow my-2">
        <div className="card-header py-0">
          <div className="h3">{item.name}</div>
        </div>
        <div className="card-body">
          <p className="card-text">{item.description}</p>

          <Link
            className="col-4 btn btn-primary"
            to={`/categories/${item.category_id}/items`}
          >
            <div className="">View</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
