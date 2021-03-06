import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { readItem, addItem, updateItem } from "../utils/api";
import TextEditor from "./TextEditor";
import gsap from "gsap";
import dayjs from "dayjs";

const ItemForm = ({ categories, errorHandler }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { itemId } = useParams();

  const formRefs = useRef([]);
  formRefs.current = [];

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  const sampleData = `<h1><strong style="color: rgb(102, 163, 224);">Description</strong></h1><p><br></p><h2><strong><u>Item</u></strong></h2><ul><li><strong>{item.name}</strong></li><li><strong>{item.sku}</strong></li><li><strong>{item.name}</strong></li><li><strong>{item.name}</strong></li><li><a href="www.google.com" rel="noopener noreferrer" target="_blank"><strong>Link</strong></a></li></ul>`;

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
    main_imageUrl: "",
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
    image_5: "",
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
  }, [categories, categorySelected]);

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
    const categoryId = target.options[target.selectedIndex].value;
    setCategorySelected(categoryId);
    setFormData({ ...formData, category_id: categoryId });
  };

  const findCategory = categories?.find((c) => c.id == categorySelected);

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
        <div className="col-12 col-xl-10 col-lg-10 col-md-10 col-sm-10">
          <h2>
            {itemId ? "Edit Item" : "Create Item"}
            <span className="">
              <span> &#8594; </span>
              <span className="text-primary h4">{findCategory?.name}</span>
            </span>
          </h2>
        </div>

        <div className="col-1 button-back mb-3 mb-sm-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>
      </div>

      <form className="col-12" onSubmit={handleSubmit}>
        {/* Main Image Url */}
        <div className="row">
          <div className="col-12 col-md-6 mb-sm-5">
            {formData.main_imageUrl ? (
              <img
                src={formData.main_imageUrl}
                alt="Main-image"
                className="main-image-edit"
              />
            ) : null}
          </div>
          <div className="col-12 col-md-6 my-sm-3" ref={addToRefs}>
            <label htmlFor="main_imageUrl" className="form-label fw-bold">
              Main Image
            </label>
            <input
              type="text"
              name="main_imageUrl"
              className="form-control"
              id="main_imageUrl"
              aria-describedby="main_imageUrl"
              placeholder="Enter name of the item"
              value={formData.main_imageUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="list-group">
              <div className="row mb-3 item-edit-thumbnail" ref={addToRefs}>
                <div className="col-12 col-md-2">
                  <img
                    src={formData.image_1}
                    className="item-detail-thumbnail"
                  />
                </div>
                <div className="col me-3">
                  <label htmlFor="image_1" className="form-label fw-bold">
                    Image 1
                  </label>
                  <input
                    type="text"
                    name="image_1"
                    className="form-control"
                    id="1"
                    aria-describedby="image_1"
                    placeholder="Enter url for Image 1"
                    value={formData?.image_1}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3 item-edit-thumbnail" ref={addToRefs}>
                <div className="col-12 col-md-2">
                  <img
                    src={formData.image_2}
                    className="item-detail-thumbnail"
                  />
                </div>
                <div className="col me-3">
                  <label htmlFor="image_2" className="form-label fw-bold">
                    Image 2
                  </label>
                  <input
                    type="text"
                    name="image_2"
                    className="form-control"
                    id="1"
                    aria-describedby="image_2"
                    placeholder="Enter url for Image 2"
                    value={formData?.image_2}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3 item-edit-thumbnail" ref={addToRefs}>
                <div className="col-12 col-md-2">
                  <img
                    src={formData.image_3}
                    className="item-detail-thumbnail"
                  />
                </div>
                <div className="col me-3">
                  <label htmlFor="image_3" className="form-label fw-bold">
                    Image 3
                  </label>
                  <input
                    type="text"
                    name="image_3"
                    className="form-control"
                    id="1"
                    aria-describedby="image_3"
                    placeholder="Enter url for Image 3"
                    value={formData?.image_3}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3 item-edit-thumbnail" ref={addToRefs}>
                <div className="col-12 col-md-2">
                  <img
                    src={formData.image_4}
                    className="item-detail-thumbnail"
                  />
                </div>
                <div className="col me-3">
                  <label htmlFor="image_4" className="form-label fw-bold">
                    Image 4
                  </label>
                  <input
                    type="text"
                    name="image_4"
                    className="form-control"
                    id="1"
                    aria-describedby="image_4"
                    placeholder="Enter url for Image 2"
                    value={formData?.image_4}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3 item-edit-thumbnail" ref={addToRefs}>
                <div className="col-12 col-md-2">
                  <img
                    src={formData.image_5}
                    className="item-detail-thumbnail"
                  />
                </div>
                <div className="col me-3">
                  <label htmlFor="image_5" className="form-label fw-bold">
                    Image 5
                  </label>
                  <input
                    type="text"
                    name="image_5"
                    className="form-control"
                    id="1"
                    aria-describedby="image_5"
                    placeholder="Enter url for Image 2"
                    value={formData?.image_5}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          {/* Categories Dropdown */}
          <div className="col-12 col-md-6" ref={addToRefs}>
            <label htmlFor="category_id" className="form-label fw-bold">
              Category
            </label>
            <select
              className="form-select form-select-sm py-2"
              name="category_id"
              aria-label="Select Category"
              onChange={handleSelectCategory}
              value={categorySelected}
            >
              {loadCategories}
            </select>
          </div>

          {/* Name */}
          <div className="col-12 col-md-6" ref={addToRefs}>
            <label htmlFor="name" className="form-label fw-bold">
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
        </div>

        <div className="row">
          {/* Description */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="description" className="form-label fw-bold">
              Item Description
            </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              id="description"
              rows="8"
              value={formData?.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Price */}
          <div className="col-12 col-md-6 mb-3" ref={addToRefs}>
            <label htmlFor="price" className="form-label fw-bold">
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
          <div className="col-12 col-md-6 mb-3" ref={addToRefs}>
            <label htmlFor="quantity_in_stock" className="form-label fw-bold">
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
        </div>

        <div className="row">
          {/* Model */}
          <div className="col-12 col-md-6 mb-3" ref={addToRefs}>
            <label htmlFor="model" className="form-label fw-bold">
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

          {/* Sku / Product Number */}
          <div className="col-12 col-md-6 mb-3" ref={addToRefs}>
            <label htmlFor="sku" className="form-label fw-bold">
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
        </div>

        {/* Text Editor
        <div className="mb-3" ref={addToRefs}>
          <label htmlFor="description" className="form-label fw-bold">
            Content
          </label>
          <TextEditor />
        </div> */}

        <div className="row">
          {/* Release Date */}
          <div className="col-12 col-md-6 mb-3" ref={addToRefs}>
            <label htmlFor="release_date" className="form-label fw-bold">
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

          {/* In Stock */}
          <div className="col-12 col-md-6 mb-3" ref={addToRefs}>
            <label htmlFor="weight_in_lbs" className="form-label fw-bold">
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
        </div>

        {/* Checkbox */}
        <div className="mb-3 form-check" ref={addToRefs}>
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={true}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Available
          </label>
        </div>

        <button
          type="submit"
          className="col-2 btn btn-primary me-3 btn-fixed-main"
          ref={addToRefs}
        >
          Submit
        </button>
        <button
          type="button"
          className="col-2 btn btn-secondary btn-fixed-main"
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
