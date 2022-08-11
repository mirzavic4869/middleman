import React from "react";
import CardProduct from "../../components/CardProduct";
import Navbar from "../../components/Navbar";
import { MdSearch } from "react-icons/md";
import Modal from "../../components/Modal";

function Inventory() {
  return (
    <>
      <Navbar />
      <div title="Title" className="m-4">
        <h1 className="text-black font-Roboto font-semibold text-4xl">My Product</h1>
      </div>
      <div className="flex justify-between gap-2 m-4">
        <div className="flex gap-2 w-96">
          <input type="text" placeholder="Search..." className="input input-sm input-bordered input-primary w-full max-w-xs text-black font-Poppins" />
          <button title="Search" className="btn btn-sm btn-primary text-2xl text-white">
            <MdSearch />
          </button>
        </div>
        <label htmlFor="modal-add" className="btn btn-sm btn-primary modal-button text-white font-Roboto">
          Add Product
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2 m-2 md:grid-cols-3">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
      <Modal id="modal-add" title="Add Product" />
    </>
  );
}

export default Inventory;
