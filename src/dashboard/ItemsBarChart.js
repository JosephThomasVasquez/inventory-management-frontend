import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../layout/Loader";
import ToolTip from "./ToolTip";
import "./barChart.style.css";
import * as d3 from "d3";
import gsap from "gsap";

const ItemsBarChart = ({ items }) => {
  const location = useLocation();

  const itemRefs = useRef([]);
  itemRefs.current = [];
  const svgRef = useRef(null);
  const updateChart = useRef(false);

  const addToRefs = (e) => {
    if (e && !itemRefs.current.includes(e)) itemRefs.current.push(e);
  };

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
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const drawChart = (data, dimensions) => {
    const svg = d3.select(svgRef.current),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map((d) => d.id));
    y.domain([0, d3.max(data, (d) => d.quantity_in_stock)]);

    const max = d3.max(data, function (d) {
      return +d.value;
    });

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("name");

    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .attr("name", (d) => d.name)
      .attr("value", (d) => d.quantity_in_stock)
      .attr("x", (d, i) => x(d.id))
      .attr("y", (d) => y(d.quantity_in_stock))
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.quantity_in_stock);
      });

    // Handle mouse over on bar, shows tool tip
    function handleMouseOver(d, i) {
      // const xPos = parseFloat(d3.select(this).attr("x"));
      const xPos = parseFloat(d.clientX);
      const yPos = parseFloat(d3.select(this).attr("y")) + height * 0.75;

      d3.select(".tool-tip-chart")
        .style("left", `${xPos}px`)
        .style("top", `${yPos}px`)
        .select("#name")
        .text(i.name);

      d3.select(".tool-tip-chart").select("#value").text(i.quantity_in_stock);

      d3.select(".tool-tip-chart").classed("tool-tip-hide", false);
    }

    // Handle mouse out on bar, hides tool tip
    function handleMouseOut() {
      d3.select(this).transition().duration(500);

      d3.select(".tool-tip-chart").classed("tool-tip-hide", true);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      itemRefs.current,
      {
        opacity: 0,
        y: -40,
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
  }, [items]);

  const resizeHandler = useDebouncedCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    if (updateChart.current) {
      d3.selectAll("g").remove();
    } else {
      updateChart.current = true;
    }
  }, []);
  useDebouncedCallback(resizeHandler, 200);

  useEffect(() => {
    // update dimensions on window resize

    window.addEventListener("resize", resizeHandler);

    if (items) {
      drawChart(items, dimensions);
    }

    setItemsData({ ...itemDataOptions });
  }, [items, dimensions, location]);

  return (
    <div className="row chart-body p-3">
      <div>Item Quantities</div>
      <div>
        {!items ? (
          <Loader />
        ) : (
          <svg
            ref={svgRef}
            width={dimensions.width * 0.8}
            height={dimensions.height / 3}
            className="stock-chart-data"
          ></svg>
        )}
      </div>
      {/* <div>{JSON.stringify(itemsData)}</div> */}
      <ToolTip />
    </div>
  );
};

export default ItemsBarChart;
