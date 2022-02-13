import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { readItem, addItem, updateItem } from "../utils/api";
import gsap from "gsap";
import dayjs from "dayjs";

const ItemForm = ({ categories, errorHandler }) => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  // console.log(categories);

  const { itemId } = useParams();
  console.log("itemId", itemId);

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
    category_id: 1,
    // photos: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categorySelected, setCategorySelected] = useState(
    initialFormData.category_id
  );

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

  useEffect(() => {
    setCategorySelected(formData.category_id);
  }, [categories]);

  // Fetch existing item data
  useEffect(() => {
    const abortController = new AbortController();
    const getItemData = async () => {
      try {
        const response = await readItem(itemId, abortController.signal);

        if (response) {
          setCategorySelected(response.category_id);
          const formatDate = dayjs(response.release_date).format("YYYY-MM-DD");
          setFormData({ ...response, release_date: formatDate });
        } else {
          setFormData(initialFormData);
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (itemId) {
      getItemData();
    }

    return () => abortController.abort();
  }, [itemId]);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Send POST request with formData
  const handleSubmit = (e) => {
    e.preventDefault();

    const submitRegistration = async () => {
      const abortController = new AbortController();

      try {
        // Update item
        if (itemId) {
          const response = await updateItem(formData, abortController.abort());
          setFormData(response);
          errorHandler("clearErrors");
          navigate(`/items/${itemId}`);
        } else {
          // Add Item
          const response = await addItem(formData, abortController.abort());
          setFormData(response);
          errorHandler("clearErrors");

          navigate("/dashboard");
        }
      } catch (error) {
        error && errorHandler(error);
      }
    };

    submitRegistration();
  };

  const handleSelectCategory = ({ target }) => {
    console.log("target", target.options[target.selectedIndex].text);
    // options[sel.selectedIndex].text;
    setCategorySelected(target.value);
    setFormData({ ...formData, category_id: target.value });
  };

  const loadCategories = categories?.map(({ name, id }) => (
    <option key={id} name={name} className="list-group-item" value={id}>
      {name}
    </option>
  ));

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-11">
          <h2>
            {itemId ? "Edit Item" : "Create Item"}
            <span className="">
              <span> &#8594; </span>
              <span className="text-primary h4">
                {categories ? categories[categorySelected - 1]?.name : null}
              </span>
            </span>
          </h2>
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

      <form className="col-6" onSubmit={handleSubmit}>
        {/* Categories Dropdown */}
        <div className="row">
          <div className="col-6 my-3" ref={addToRefs}>
            <label htmlFor="category_id" className="form-label">
              Category
            </label>
            <select
              className="form-select form-select-sm py-2"
              aria-label="Select Category"
              onChange={handleSelectCategory}
              value={categorySelected}
            >
              {loadCategories}
            </select>
          </div>
        </div>

        {/* Name */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="name" className="form-label">
            Item Name
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

        {/* Model */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="model" className="form-label">
            Item Model
          </label>
          <input
            type="text"
            name="model"
            className="form-control"
            id="model"
            aria-describedby="model"
            placeholder="Enter model of the item"
            value={formData?.model}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="description" className="form-label">
            Item Description
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

        {/* Release Date */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="release_date" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            name="release_date"
            className="form-control"
            id="release_date"
            aria-describedby="release_date"
            placeholder="Enter release date of the item"
            value={formData?.release_date}
            onChange={handleChange}
          />
        </div>

        {/* Sku / Product Number */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="sku" className="form-label">
            Sku / Product Number
          </label>
          <input
            type="text"
            name="sku"
            className="form-control"
            id="sku"
            aria-describedby="sku"
            placeholder="Enter a Sku or Product Number"
            value={formData?.sku}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="price" className="form-label">
            Item price
          </label>
          <input
            type="number"
            name="price"
            min="0"
            step="any"
            className="form-control"
            id="price"
            aria-describedby="price"
            placeholder="Enter name of the item"
            value={formData?.price}
            onChange={handleChange}
          />
        </div>

        {/* In Stock */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="quantity_in_stock" className="form-label">
            Quantity in stock
          </label>
          <input
            type="number"
            name="quantity_in_stock"
            min="0"
            step="any"
            className="form-control"
            id="quantity_in_stock"
            aria-describedby="quantity_in_stock"
            placeholder="Enter quanttiy in stock"
            value={formData?.quantity_in_stock}
            onChange={handleChange}
          />
        </div>

        {/* In Stock */}
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="weight_in_lbs" className="form-label">
            Weight in lbs.
          </label>
          <input
            type="number"
            name="weight_in_lbs"
            min="0"
            step="any"
            className="form-control"
            id="weight_in_lbs"
            aria-describedby="weight_in_lbs"
            placeholder="Enter weight in lbs."
            value={formData?.weight_in_lbs}
            onChange={handleChange}
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

        <button
          type="submit"
          className="col-2 btn btn-primary me-3"
          ref={addToRefs}
        >
          Submit
        </button>
        <button
          type="button"
          className="col-2 btn btn-secondary"
          ref={addToRefs}
          onClick={handleGoBack}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
