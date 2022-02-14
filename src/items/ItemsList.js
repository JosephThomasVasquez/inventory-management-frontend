import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { listItems, searchItems } from "../utils/api";
import ItemCard from "./ItemCard";
import ItemsTable from "./ItemsTable";
import gsap from "gsap";

const ItemsList = () => {
  const { categoryId } = useParams();
  console.log("catId", categoryId);
  const navigate = useNavigate();

  const { search, state } = useLocation();
  const location = useLocation();

  console.log("search", search);
  console.log("state", state);
  console.log("location", location);

  const itemRefs = useRef([]);
  itemRefs.current = [];

  const [items, setItems] = useState();
  const [tableView, setTableView] = useState(false);

  const [searchTerm, setSearchTerm] = useState(state);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    if (categoryId) {
      setItems(null);
      listItems(categoryId, abortController.signal)
        .then(setItems)
        .catch(setErrors);
    }

    return () => abortController.abort();
  }, [categoryId]);

  useEffect(() => {
    const abortController = new AbortController();

    if (searchTerm) {
      setItems(null);
      searchItems(searchTerm, abortController.signal)
        .then(setItems)
        .catch(setErrors);
    }
    return () => abortController.abort();
  }, [searchTerm]);

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
  }, [items, tableView]);

  const mapItems = () => {
    return items.map((item) => (
      <div className="col-3" key={item.id} ref={addToRefs}>
        <ItemCard item={item} />
      </div>
    ));
  };

  const handleSwitch = ({ target }) => {
    setTableView(!tableView);
  };

  const handleClick = () => {
    navigate(`/items/create`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <h2>Items</h2>
        </div>
        <div className="col my-auto">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={handleSwitch}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Table View
            </label>
          </div>
        </div>

        <div className="col-1 my-auto button-back">
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
              <i className="fa fa-plus"></i> Add Item
            </button>
          </div>
        </div>
      </div>

      {tableView ? (
        <ItemsTable items={items} />
      ) : (
        <div className="row">{items && mapItems()}</div>
      )}
    </div>
  );
};

export default ItemsList;
