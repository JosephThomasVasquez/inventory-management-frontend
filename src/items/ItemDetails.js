import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { readItem } from "../utils/api";
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-11 text-primary">
          <h2>{itemDetails?.name}</h2>
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

      {itemDetails && (
        <div>
          <div className="row">
            {/* Name */}
            <div className="col-8 mb-3 h5" ref={addToRefs}>
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
            {/* Price */}
            <div className="col-2 mb-1 h6" ref={addToRefs}>
              <span className="text-primary">Release Date:</span>{" "}
              {itemDetails.release_date}
            </div>
            {/* Model */}
            <div className="col-2 mb-3 h6" ref={addToRefs}>
              <span className="text-primary">Model:</span> {itemDetails.model}
            </div>
            {/* Quantity */}
            <div className="col-2 mb-3 h6" ref={addToRefs}>
              <span className="text-primary">Qty:</span>{" "}
              {itemDetails.quantity_in_stock}
            </div>
            {/* Name */}
            <div className="col-4 mb-1 h6" ref={addToRefs}>
              <span className="text-primary"> Sku / Product No:</span>{" "}
              {itemDetails.sku}
            </div>
          </div>

          <div className="row">
            {/* Name */}
            <div className="col-2 mb-3 h6" ref={addToRefs}>
              <span className="text-primary">Lbs(each):</span>{" "}
              {itemDetails.weight_in_lbs}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
