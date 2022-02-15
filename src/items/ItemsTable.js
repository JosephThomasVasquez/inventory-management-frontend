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
      let headers = Object.keys(items[0]);

      const filteredHeaders = headers.filter((header) => {
        if (
          header !== "description" &&
          header !== "release_date" &&
          header !== "description"
        ) {
          return header;
        }
      });

      console.log("filteredHeaders", filteredHeaders);

      const renameHeaders = () => {
        headers.forEach((header, index) => {
          if (header === "quantity_in_stock") {
            headers[index] = "Stock";
          }

          if (header === "weight_in_lbs") {
            headers[index] = "Weight";
          }

          if (header === "release_date") {
            headers[index] = "Release";
          }
        });
      };

      renameHeaders();

      const trimHeaders = headers.splice(0, headers.length - 3);
      trimHeaders.push("Details");
      trimHeaders.push("Edit");

      const values = trimHeaders.map((head) => (
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
        sku,
        name,
        model,
        description,
        release_date,
        price,
        quantity_in_stock,
        weight_in_lbs,
      } = item;

      return (
        <tr scope="row" key={id} ref={addToRefs} className="item-row">
          <td colSpan="1">{id}</td>
          <td colSpan="1" className="text-center">
            {sku ? sku : "..."}
          </td>
          <td colSpan="1" className="text-primary fw-bold">
            {name.length > 32 ? `${name.substring(0, 32)} ...` : name}
          </td>
          <td colSpan="1">{model ? model : "..."}</td>
          <td colSpan="1">
            {description.length > 32
              ? `${description.substring(0, 32)} ...`
              : description}
          </td>
          <td colSpan="1">
            {release_date ? dayjs(release_date).format("MMM DD, YYYY") : "N/A"}
          </td>
          <td colSpan="1" className="text-primary fw-bold">
            ${price}
          </td>
          <td colSpan="1">{quantity_in_stock}</td>
          <td colSpan="1">{weight_in_lbs} lbs.</td>
          <td>
            <Link className="col btn btn-primary" to={`/items/${item.id}`}>
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
