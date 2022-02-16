import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listAllItems } from "../utils/api";

const SearchItem = ({ errorHandler }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    navigate(`/search?item=${searchTerm}`, { state: searchTerm });
    setSearchTerm("");
  };

  return (
    <form className="d-flex col-4" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search items..."
        aria-label="Search"
        value={searchTerm ? searchTerm : ""}
        onChange={handleChange}
      />
      <button className="col-2 btn btn-primary" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchItem;
