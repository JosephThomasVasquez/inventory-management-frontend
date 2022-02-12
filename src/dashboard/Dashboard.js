import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ categories }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <h2 className="text-primary">Dashboard</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-2 btn btn-primary">
          Categories:
          <span className="col"> {categories ? categories.length : null}</span>
        </div>
      </div>
      <div className="row my-3">
        <Link className="col-2 btn btn-primary" to={`/categories/create`}>
          <div className="">Create Category</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
