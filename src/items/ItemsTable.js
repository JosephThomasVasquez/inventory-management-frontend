import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ItemsTable = ({ items }) => {
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const tableHeaders = () => {
    // console.log(items);

    let headers = Object.keys(items[0]);

    const renameHeaders = () => {
      headers.forEach((header, index) => {
        if (header === "quantity_in_stock") {
          headers[index] = "Stock";
        }

        if (header === "weight_in_lbs") {
          headers[index] = "Weight";
        }
      });
    };

    renameHeaders();

    console.log("headers", headers);

    const trimHeaders = headers.splice(0, headers.length - 3);
    trimHeaders.push("Details");

    const values = trimHeaders.map((head) => (
      <th scope="col" key={head} className="text-primary">
        {head.toUpperCase()}
      </th>
    ));
    // console.log("values", values);
    return values;
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
        <tr scope="row" key={id} ref={addToRefs}>
          <td colSpan="1">{id}</td>
          <td colSpan="1">{sku}</td>
          <td colSpan="1">{name}</td>
          <td colSpan="1">{model}</td>
          <td colSpan="1">{description}</td>
          <td colSpan="1">{release_date}</td>
          <td colSpan="1">${price}</td>
          <td colSpan="1">{quantity_in_stock}</td>
          <td colSpan="1">{weight_in_lbs} lbs.</td>
          <td>
            <Link className="col btn btn-primary" to={`/items/${item.id}`}>
              <div className="">View</div>
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
      <tbody>
        <tr>
          {/* <th scope="row">1</th>
          {tableItems} */}
        </tr>
        {fillRows()}
      </tbody>
    </table>
  );
};

export default ItemsTable;
