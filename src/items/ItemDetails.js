import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "./item.style.css";
import { readItem } from "../utils/api";
import dayjs from "dayjs";
import gsap from "gsap";

const ItemDetails = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const location = useLocation();

  const itemRefs = useRef([]);
  itemRefs.current = [];

  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    setItemDetails(null);
    readItem(itemId, abortController.signal)
      .then(setItemDetails)
      .catch((error) => {
        console.log(error);
      });
    return () => abortController.abort();
  }, []);

  const addToRefs = (e) => {
    if (e && !itemRefs.current.includes(e)) itemRefs.current.push(e);
  };

  useEffect(() => {
    gsap.fromTo(
      itemRefs.current,
      {
        opacity: 0,
        y: -100,
        stagger: 0.15,
        duration: 0.75,
        ease: "back.out(2.5)",
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.75,
        ease: "back.out(2.5)",
      }
    );
  }, [itemDetails]);

  const handleDate = () => {
    if (!itemDetails.release_date) {
      return "N/A";
    }

    return dayjs(itemDetails.release_date).format("MMM DD, YYYY");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-11 text-primary">
          <h2 ref={addToRefs}>{itemDetails?.name}</h2>
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
        <div className="row my-2" ref={addToRefs}>
          <div className="col">
            <Link
              className="btn btn-outline-primary"
              to={`/items/${itemDetails?.id}/edit`}
            >
              <div className="">
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </div>
            </Link>
          </div>
        </div>
      </div>

      {itemDetails && (
        <div>
          <div className="row">
            {/* Main Image */}
            <div className="col-6 mb-3 h5" ref={addToRefs}>
              <img
                src={itemDetails.main_imageUrl}
                alt="default_image"
                className="main-item-image"
                width="300"
                height="400"
              />
            </div>
            {/* Name */}
            <div className="col-6 mb-3 h5" ref={addToRefs}>
              {itemDetails.description}
            </div>
          </div>

          <div className="row">
            {/* Price */}
            <div className="col-4 my-5 h2 text-primary" ref={addToRefs}>
              ${itemDetails.price}
            </div>
          </div>

          <div className="row">
            {/* Quantity */}
            <div className="col-2 mb-3 h6" ref={addToRefs}>
              <span className="text-primary">Qty:</span>{" "}
              {itemDetails.quantity_in_stock}
            </div>

            {/* Model */}
            <div className="col-2 mb-3 h6" ref={addToRefs}>
              <span className="text-primary">Model:</span>{" "}
              {itemDetails.model ? itemDetails.model : "N/A"}
            </div>

            {/* Name */}
            <div className="col-2 mb-1 h6" ref={addToRefs}>
              <span className="text-primary"> Sku / Product No:</span>{" "}
              {itemDetails.sku}
            </div>
            {/* Release Date */}
            <div className="col-3 mb-1 h6" ref={addToRefs}>
              <span className="text-primary">Release Date:</span> {handleDate()}
            </div>
          </div>

          <div className="row">
            {/* Name */}
            <div className="col-2 mb-3 h6" ref={addToRefs}>
              <span className="text-primary">Weight:</span>{" "}
              {itemDetails.weight_in_lbs} lbs.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
