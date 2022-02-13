import React from "react";
import "./navMenu.styles.css";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand">
          <div className="" aria-current="page" href="#">
            inventoryMS
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link-item">
                <div className="nav-link active" aria-current="page" href="#">
                  Dashboard
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link-item">
                <div className="nav-link" href="#">
                  Categories
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/categories" className="nav-link-item">
                <div className="nav-link" href="#">
                  Add Item
                </div>
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="col-2 btn btn-primary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-4">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i> Username
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="/login" className="dropdown-item">
                    <div className="">Login</div>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="dropdown-item">
                    <div className="">Register</div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/login" className="dropdown-item">
                    <div className="">Logout</div>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
