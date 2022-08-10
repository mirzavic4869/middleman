import React from "react";
import CardProduct from "../../components/CardProduct";
import Navbar from "../../components/Navbar";

function index() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 m-4">
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </>
  );
}

export default index;
