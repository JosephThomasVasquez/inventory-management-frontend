import React, { useState, useEffect, useRef, forwardRef } from "react";
import { listCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import gsap from "gsap";

const CategoriesList = ({ categories }) => {
  const navigate = useNavigate();

  const categoryRefs = useRef([]);
  categoryRefs.current = [];

  const addToRefs = (e) => {
    if (e && !categoryRefs.current.includes(e)) categoryRefs.current.push(e);
  };

  useEffect(() => {
    gsap.fromTo(
      categoryRefs.current,
      {
        opacity: 0,
        y: -100,
        stagger: 0.05,
        duration: 0.75,
        ease: "back.out(1.5)",
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.75,
        ease: "back.out(1.5)",
      }
    );
  }, [categories]);

  const categoryLinks = () => {
    if (categories) {
      return categories.map((category, index) => (
        <div key={category.id} ref={addToRefs}>
          <CategoryCard category={category} />
        </div>
      ));
    }
  };

  const handleClick = () => {
    navigate(`/categories/create`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Categories</h2>
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

        <div className="row my-2">
          <div className="col-2">
            <button className="btn btn-primary" onClick={handleClick}>
              <i className="fa fa-plus"></i> Add Category
            </button>
          </div>
        </div>
      </div>

      <div className="col-6">{categories && categoryLinks()}</div>
    </div>
  );
};

export default CategoriesList;
