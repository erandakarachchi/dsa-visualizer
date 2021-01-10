import React from "react";
import "./styles.css";

function Node({ data, mid, low, high }) {
  let className = "";
  if (mid) {
    className = "node-mid";
  } else if (low) {
    className = "node-low";
  } else if (high) {
    className = "node-high";
  } else {
    className = "node-default ";
  }
  return (
    <div className={`node ${className}`}>
      <p className={'node-value'}>{data}</p>
    </div>
  );
}

export default Node;
