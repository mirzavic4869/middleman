/* eslint-disable @next/next/no-img-element */
import React from "react";

function CardProduct() {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-lg m-2">
        <figure>
          <img src="https://placeimg.com/200/250/arch" alt="Movie" />
        </figure>
        <div className="card-body font-Poppins">
          <h2 className="card-title">Minyak Goreng</h2>
          <h3>Unit: Liter</h3>
          <h3>Stock: 100</h3>
          <p>Price: Rp. 10.000</p>
          <div className="card-actions justify-end font-Roboto">
            <button className="btn bg-[#1DB468]">Edit</button>
            <button className="btn bg-[#FF0000]">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardProduct;
