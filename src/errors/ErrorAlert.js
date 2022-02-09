import React, { useState, useEffect } from "react";
import "./alertStyles.css";

const ErrorAlert = ({ errors }) => {
  const [displayError, setDisplayError] = useState("hide");

  useEffect(() => {
    if (errors) {
      setDisplayError("show");
    } else {
      setDisplayError("hide");
    }
  }, [errors]);

  const handleDisplayError = () => {
    setDisplayError("hide");
  };

  return errors ? (
    <div
      className={`col alert alert-danger my-3 alert-dismissible shadow fade ${displayError} alert-float mx-5 py-2`}
      role="alert"
    >
      <span className="font-weight-bold"> Error:</span> {errors.message}
      {displayError === "show" ? (
        <button
          type="button"
          className="btn-close p-3"
          aria-label="Close"
          onClick={handleDisplayError}
        >
          <span aria-hidden="true"></span>
        </button>
      ) : null}
    </div>
  ) : (
    <div
      className={`col alert alert-danger my-3 alert-dismissible shadow fade ${displayError} alert-float mx-5 py-2`}
      role="alert"
    ></div>
  );
};

export default ErrorAlert;
