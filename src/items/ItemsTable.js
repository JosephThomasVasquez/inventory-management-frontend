import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import addCommas from "../utils/numberFormat";
import { deleteItem } from "../utils/api";
import "./itemTable.style.css";
import dayjs from "dayjs";
import gsap from "gsap";

const ItemsTable = ({ items, errorHandler }) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const itemRefs = useRef([]);
  itemRefs.current = [];

  const [selectedItem, setSelectedItem] = useState({ name: "", id: "" });

  const tableHeaders = () => {
    if (items.length > 0) {
      let headers = [
        "ID",
        "Image",
        "Name",
        "Sku",
        "model",
        "Price",
        "Stock",
        "Weight",
        "Release",
        "Details",
        "Edit",
        "Delete",
      ];

      const values = headers.map((head) => (
        <th scope="col" key={head} className="text-primary">
          {head[0].toUpperCase() + head.slice(1)}
        </th>
      ));

      return values;
    }
  };

  const addToRefs = (e) => {
    if (e && !itemRefs.current.includes(e)) itemRefs.current.push(e);
  };

  useEffect(() => {
    gsap.fromTo(
      itemRefs.current,
      {
        opacity: 0,
        y: -40,
        stagger: 0.025,
        duration: 0.75,
        ease: "back.out(1.5)",
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.025,
        duration: 0.75,
        ease: "back.out(1.5)",
      }
    );
  }, [items]);

  const handleDelete = async () => {
    try {
      await deleteItem(selectedItem.id);
      console.log("Deleted Item");

      setSelectedItem({ name: "", id: "" });
      navigate(`/categories/${categoryId}/items`);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleConfirmation = ({ target }) => {
    // console.log(target.id);

    const foundItem = items.find((i) => i.id === Number(target.id));
    // console.log(foundItem);

    setSelectedItem({ name: foundItem.name, id: foundItem.id });
    // console.log(selectedItem);
  };

  const deleteModal = (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirm Delete Item?
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              This operation cannot be undone. Are you sure you want to delete
              the item ( <span className="fw-bold">{selectedItem.name}</span> )?
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const fillRows = () => {
    return items.map((item, index) => {
      const {
        id,
        main_imageUrl,
        name,
        sku,
        model,
        price,
        release_date,
        quantity_in_stock,
        weight_in_lbs,
      } = item;

      return (
        <tr scope="row" key={id} ref={addToRefs} className="item-row">
          <td colSpan="1" className="align-middle">
            {id}
          </td>
          <td colSpan="1" className="align-middle">
            <img src={main_imageUrl} alt="Main Image" className="table-image" />
          </td>
          <td colSpan="1" className="text-primary fw-bold align-middle">
            {name.length > 32 ? `${name.substring(0, 32)} ...` : name}
          </td>
          <td colSpan="1" className="text-center align-middle">
            {sku ? sku : "..."}
          </td>

          <td colSpan="1" className="align-middle">
            {model ? model : "..."}
          </td>

          <td colSpan="1" className="text-primary fw-bold align-middle">
            ${addCommas(price)}
          </td>
          <td colSpan="1" className="align-middle">
            {quantity_in_stock}
          </td>
          <td colSpan="1" className="align-middle">
            {weight_in_lbs} lbs.
          </td>
          <td colSpan="1" className="align-middle">
            {release_date ? dayjs(release_date).format("MMM DD, YYYY") : "N/A"}
          </td>

          <td>
            <Link className="col btn btn-primary" to={`/items/${item.id}`}>
              <div className="">
                <i className="fa-solid fa-eye"></i>
              </div>
            </Link>
          </td>

          <td>
            <Link
              className="col btn btn-outline-primary"
              to={`/items/${item.id}/edit`}
            >
              <div className="">
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
            </Link>
          </td>

          <td>
            <div
              className="col btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              name={name}
              id={id}
              value={name}
              onClick={handleConfirmation}
            >
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </td>
        </tr>
      );
    });
  };

  fillRows();

  return (
    <div>
      {deleteModal}
      <table className="table shadow rounded" ref={addToRefs}>
        <thead>
          <tr>{tableHeaders()}</tr>
        </thead>
        <tbody>{fillRows()}</tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
