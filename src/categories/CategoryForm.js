import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createCategory } from "../utils/api";
import gsap from "gsap";

const CategoryForm = ({ categories }) => {
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
    category_id: "",
    // photos: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categorySelected, setCategorySelected] = useState(null);

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

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-11">
          <h2>Create Category</h2>
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
    </div>
  );
};

export default CategoryForm;
