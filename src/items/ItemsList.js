import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listItems } from "../utils/api";
import ItemCard from "./ItemCard";
import gsap from "gsap";

const ItemsList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const cardRef = useRef();
  const singleCard = gsap.utils.selector(cardRef);

  const [items, setItems] = useState();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setItems(null);
    listItems(categoryId, abortController.signal)
      .then(setItems)
      .catch(setErrors);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      singleCard(".card"),
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
  }, [items]);

  const mapItems = () => {
    return items.map((item) => <ItemCard key={item.id} item={item} />);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Items</h2>
        </div>
        <button
          type="button"
          className="btn btn-primary col-1"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <div className="col-3">{categoryId}</div>
      <div className="row" ref={cardRef}>
        {items && mapItems()}
      </div>
    </div>
  );
};

export default ItemsList;
