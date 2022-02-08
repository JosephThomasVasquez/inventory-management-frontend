import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const ItemForm = ({ category }) => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  console.log(navigate);

  const formRefs = useRef([]);
  formRefs.current = [];

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  useEffect(() => {
    gsap.fromTo(
      formRefs.current,
      {
        opacity: 0,
        x: -100,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(2.5)",
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(2.5)",
      }
    );
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-2">
          <h2>Create Item</h2>
        </div>
        <div className="col-9 h4 my-auto text-primary">
          {location.state.name}
        </div>
        <div className="col-1 button-back">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>
      </div>

      <form className="col-6">
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="item-name" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="item-name"
            aria-describedby="item-name"
            placeholder="Enter name of the item"
          />
        </div>

        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Item Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="item-description"
          />
        </div>

        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="item-release-date" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            className="form-control"
            id="item-release-date"
            aria-describedby="item-release-date"
            placeholder="Enter name of the item"
          />
        </div>

        <div className="mb-3 form-check" ref={addToRefs}>
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>

        <button type="submit" className="btn btn-primary" ref={addToRefs}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
