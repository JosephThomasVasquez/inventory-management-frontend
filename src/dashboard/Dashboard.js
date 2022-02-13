import React from "react";
import { Link } from "react-router-dom";
import ItemsBarChart from "./ItemsBarChart";

const Dashboard = ({ categories, items }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <h2 className="text-primary">Dashboard</h2>
        </div>
      </div>

      <div className="row">
        <Link className="col-2 btn btn-primary" to={`/categories`}>
          <i className="fa-solid fa-list"></i> Categories:
          <span className="col"> {categories ? categories.length : null}</span>
        </Link>
      </div>
      <div className="row my-3">
        <Link className="col-2 btn btn-primary" to={`/categories/create`}>
          <div className="">
            <i className="fa fa-plus"></i> Create Category
          </div>
        </Link>
      </div>

      <div className="row">
        <div className="col">
          <ItemsBarChart items={items} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
