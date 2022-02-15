import React from "react";
import "./toolTip.style.css";

const ToolTip = ({ item }) => {
  return (
    <div className="row tool-tip-chart tool-tip-hide">
      <div className="row">
        <div className="col fw-bold" id="name">
          Name
        </div>
      </div>
      <div className="row">
        <div className="col">
          Qty:
          <span id="value" className="fw-bold">
            {" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
