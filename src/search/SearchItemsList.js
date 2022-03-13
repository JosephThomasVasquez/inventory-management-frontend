import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { searchItems } from "../utils/api";
import ItemCard from "../items/ItemCard";
import ItemsTable from "../items/ItemsTable";
import gsap from "gsap";

const SearchItemList = ({ errorHandler }) => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [tableView, setTableView] = useState(false);

  const [errors, setErrors] = useState(null);

  const { search, state } = useLocation();
  const location = useLocation();

  //   console.log("search", search);
  //   console.log("state", state);
  // console.log("location", location);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("item") || "";

  const itemRefs = useRef([]);
  itemRefs.current = [];

  const tryItemSearch = () => {
    const abortController = new AbortController();
    setItems(null);
    searchItems(state, abortController.signal).then(setItems).catch(setErrors);

    return () => abortController.abort();
  };

  useEffect(tryItemSearch, [location]);

  const addToRefs = (e) => {
    if (e && !itemRefs.current.includes(e)) itemRefs.current.push(e);
  };

  useEffect(() => {
    gsap.fromTo(
      itemRefs.current,
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
  }, [items, tableView, search]);

  const mapItems = () => {
    return items.map((item) => (
      <div
        className="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12"
        key={item.id}
        ref={addToRefs}
      >
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
        <div className="col-12 col-xl-10 col-lg-10 col-md-10 col-sm-10">
          <h2>
            Search Items <span className="h5 text-secondary">( </span>
            <span className="h4 text-primary fw-bold">{items?.length} </span>
            <span className="h5 text-secondary">) </span>
          </h2>
        </div>

        <div className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 my-auto button-back text-end mb-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>

        <div className="col-12 col-sm-12 my-auto mb-3">
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

        <div className="row my-2">
          <div className="col-2 col-sm-12 col-12">
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

export default SearchItemList;
