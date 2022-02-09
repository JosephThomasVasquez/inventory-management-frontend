import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const ItemForm = ({ category }) => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const formRefs = useRef([]);
  formRefs.current = [];

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  const initialFormData = {
    sku: "",
    name: "",
    model: "",
    description: "",
    release_date: "",
    price: 0,
    quantity_in_stock: 0,
    weight_in_lbs: 0,
    photos: [],
  };

  const [formData, setFormData] = useState(initialFormData);

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
        {/* Name */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="name" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter name of the item"
          />
        </div>

        {/* Model */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="model" className="form-label">
            Item Model
          </label>
          <input
            type="text"
            className="form-control"
            id="model"
            aria-describedby="model"
            placeholder="Enter model of the item"
          />
        </div>

        {/* Description */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="description" className="form-label">
            Item Description
          </label>
          <textarea type="text" className="form-control" id="description" />
        </div>

        {/* Release Date */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="release_date" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            aria-describedby="release_date"
            placeholder="Enter release date of the item"
          />
        </div>

        {/* Sku / Product Number */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="sku" className="form-label">
            Sku / Product Number
          </label>
          <input
            type="text"
            className="form-control"
            id="sku"
            aria-describedby="sku"
            placeholder="Enter a Sku or Product Number"
          />
        </div>

        {/* Price */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="price" className="form-label">
            Item price
          </label>
          <input
            type="number"
            min="0"
            step="any"
            className="form-control"
            id="price"
            aria-describedby="price"
            placeholder="Enter name of the item"
          />
        </div>

        {/* In Stock */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="quantity_in_stock" className="form-label">
            Quantity in stock
          </label>
          <input
            type="number"
            min="0"
            step="any"
            className="form-control"
            id="quantity_in_stock"
            aria-describedby="quantity_in_stock"
            placeholder="Enter quanttiy in stock"
          />
        </div>

        {/* Checkbox */}
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
