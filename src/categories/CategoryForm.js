import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createCategory, readCategory, updateCategory } from "../utils/api";
import gsap from "gsap";

const CategoryForm = ({ errorHandler }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { categoryId } = useParams();

  const formRefs = useRef([]);
  formRefs.current = [];

  const initialFormData = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  // Fetch existing item data
  useEffect(() => {
    const abortController = new AbortController();
    const getCategoryData = async () => {
      try {
        const response = await readCategory(categoryId, abortController.signal);

        if (response) {
          setFormData({
            name: response[0].name,
            description: response[0].description,
            id: response[0].id,
          });
        } else {
          setFormData(initialFormData);
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (categoryId) {
      getCategoryData();
    }
    return () => abortController.abort();
  }, [categoryId]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitCategoryFormData = async () => {
      const abortController = new AbortController();

      try {
        // Update item
        if (categoryId) {
          const response = await updateCategory(
            formData,
            abortController.abort()
          );
          setFormData(response);
          errorHandler("clearErrors");
          navigate(`/categories`);
        } else {
          const response = await createCategory(
            formData,
            abortController.abort()
          );
          setFormData(response);
          errorHandler("clearErrors");

          navigate("/categories");
        }
      } catch (error) {
        error && errorHandler(error);
      }
    };

    submitCategoryFormData();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-9 col-xl-11 col-lg-11 col-md-11 col-sm-8">
          <h2>{categoryId ? "Edit Category" : "Create Category"}</h2>
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

      <form className="col-12 col-md-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter name of the item"
            value={formData?.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="description" className="form-label">
            Category Description
          </label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            id="description"
            value={formData?.description}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="col-6 col-sm-2 btn btn-primary me-3 btn-fixed-main"
          ref={addToRefs}
        >
          Submit
        </button>
        <button
          type="button"
          className="col-6 col-sm-2 btn btn-secondary btn-fixed-main"
          ref={addToRefs}
          onClick={handleGoBack}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
