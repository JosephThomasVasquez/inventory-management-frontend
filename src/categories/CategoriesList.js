import React, { useState, useEffect, useRef } from "react";
import { listCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import gsap from "gsap";

const CategoriesList = () => {
  const navigate = useNavigate();

  const cardRef = useRef();
  const singleCard = gsap.utils.selector(cardRef);

  const [categories, setCategories] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setCategories(null);
    listCategories(abortController.signal).then(setCategories).catch(setErrors);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      singleCard(".card"),
      { opacity: 0, x: 100, stagger: 0.15, duration: 1, ease: "back.out(2.5)" },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(2.5)",
      }
    );
  }, [categories]);

  const categoryLinks = () => {
    // console.log("categories", categories);
    return categories.map((category, index) => (
      <CategoryCard key={category.id} category={category} />
    ));
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
        <button
          type="button"
          className="btn btn-primary col-1"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <div className="col-6" ref={cardRef}>
        {categories && categoryLinks()}
      </div>
    </div>
  );
};

export default CategoriesList;
