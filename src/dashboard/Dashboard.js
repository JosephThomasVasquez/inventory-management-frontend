import React from "react";

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
    </div>
  );
};

export default Dashboard;
