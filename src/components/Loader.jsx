import React from "react";
import "./loader.css"
const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div class="loader">
    <span class="loader-text">loading</span>
      <span class="load"></span>
  </div>
    </div>
  );
};

export default Loader;
