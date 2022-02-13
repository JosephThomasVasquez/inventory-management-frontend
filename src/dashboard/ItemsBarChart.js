import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const ItemsBarChart = ({ items }) => {
  const svgRef = useRef(null);

  const barChartConfig = {
    width: 1200,
    height: 400,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    },
  };

  let itemDataOptions = {
    name: "Items",
    color: "#ff00ff",
    items: items,
  };

  const [itemsData, setItemsData] = useState({ ...itemDataOptions });

  useEffect(() => {
    if (items) {
      const svg = d3.select(svgRef.current),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

      const g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(items.map((d) => d.name));
      y.domain([0, d3.max(items, (d) => d.quantity_in_stock)]);

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("name");

      g.selectAll(".bar")
        .data(items)
        .join("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {
          return x(d.name);
        })
        .attr("y", function (d) {
          return y(d.quantity_in_stock);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.quantity_in_stock);
        });
    }

    setItemsData({ ...itemDataOptions });
  }, [items]);

  return (
    <div>
      <div>Items Chart</div>
      <div>
        <svg
          ref={svgRef}
          width={barChartConfig.width}
          height={barChartConfig.height}
        ></svg>
      </div>
      {/* <div>{JSON.stringify(itemsData)}</div> */}
    </div>
  );
};

export default ItemsBarChart;
