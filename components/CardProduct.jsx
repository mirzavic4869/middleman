/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MdAdd } from "react-icons/md";
import Modal from "./Modal";

function CardProduct() {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-lg m-2 text-black">
        <figure>
          <img src="https://placeimg.com/100/150/arch" className="h-full" alt="Product Image" />
        </figure>
        <div className="card-body">
          <div className="font-Poppins">
            <h2 className="card-title">Minyak Goreng</h2>
            <h3>Unit: Liter</h3>
            <h3>Stock: 100</h3>
            <p>Price: Rp. 10.000</p>
          </div>
          <div className="card-actions justify-start font-Roboto">
            <label id="btn-edit" title="Edit Product" htmlFor="modal-edit" className="btn btn-primary btn-sm modal-button text-white">
              Edit
            </label>
            <label id="btn-delete" title="Delete Product" htmlFor="modal-delete" className="btn btn-secondary btn-sm modal-button text-white">
              Delete
            </label>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0">
            <button id="btn-add" title="Add to Product Out" className="p-2 modal-button text-white bg-primary rounded-md hover:bg-green-700">
              <MdAdd size={20} />
            </button>
          </div>
        </div>
      </div>
      <Modal id="modal-edit" title="Edit Product" />
      <Modal id="modal-delete" title="Delete Product" />
    </>
  );
}

export default CardProduct;
