import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./itemTable.style.css";
import dayjs from "dayjs";
import gsap from "gsap";

const ItemsTable = ({ items }) => {
  const itemRefs = useRef([]);
  itemRefs.current = [];

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
            ${price}
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
            <Link className="col btn btn-primary mt-1" to={`/items/${item.id}`}>
              <div className="">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> View
              </div>
            </Link>
          </td>
          <td>
            <Link
              className="col btn btn-outline-primary"
              to={`/items/${item.id}/edit`}
            >
              <div className="">
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </div>
            </Link>
          </td>
        </tr>
      );
    });
  };

  fillRows();

  return (
    <table className="table">
      <thead>
        <tr>{tableHeaders()}</tr>
      </thead>
      <tbody>{fillRows()}</tbody>
    </table>
  );
};

export default ItemsTable;
