/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { formatCurrency } from "../pages/inventory";

function CardProduct({ data, fnEditData, fnDeleteData, fnAddProductOut, fnHandleChange, role }) {
  const [showModal, setShowModal] = useState({ title: "edit", view: false });

  const handleSubmit = async (e, idProduct) => {
    e.preventDefault();
    fnEditData(e, idProduct);
    setShowModal({ view: false });
  };

  const handleDelete = async (e, idProduct) => {
    e.preventDefault();
    fnDeleteData(e, idProduct);
    setShowModal({ view: false });
  };

  return (
    <>
      <div className="card card-side bg-white shadow-lg m-2 text-black">
        <figure>
          <img src={data.product_image} className="h-48" alt="Product Image" />
        </figure>
        <div className="card-body">
          <div className="font-Poppins ">
            <h2 className="card-title text-base">{data.product_name}</h2>
            <h3 className="text-base">Unit: {data.unit === "" ? "pcs" : data.unit}</h3>
            <h3 className="text-base">Stock: {data.stock}</h3>
            <p className="text-base">Price: {formatCurrency(data.price)}</p>
          </div>
          <div className="card-actions justify-start font-Roboto">
            <button id="btn-edit-modal" title="Edit Product" onClick={() => setShowModal({ title: "edit", view: true })} className="btn btn-primary btn-sm modal-button text-white">
              Edit
            </button>
            <label id="btn-delete-modal" title="Delete Product" onClick={() => setShowModal({ title: "delete", view: true })} className="btn btn-secondary btn-sm modal-button text-white">
              Delete
            </label>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0">
            <button
              id="btn-add-product-out"
              onClick={(e) => fnAddProductOut(e, data.id, data.stock)}
              title={`${role === "admin" ? "Add product stock" : "Add to product out"}`}
              className="p-2 modal-button text-white bg-primary rounded-bl-2xl hover:bg-green-700"
            >
              <MdAdd size={20} />
            </button>
          </div>
        </div>
      </div>
      <input type="checkbox" id="modal" className="modal-toggle" checked={showModal.view} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">{showModal.title === "edit" ? "Edit Product" : "Delete Product"}</h3>
          {showModal.title === "edit" ? (
            <section>
              <label className="label">
                <span className="label-text text-primary text-base font-Poppins">
                  Product Image<span className="text-secondary">*</span>
                </span>
              </label>
              <form id="form-edit" onSubmit={(e) => handleSubmit(e, data.id)}>
                <input type="file" id="input-image" onChange={(e) => fnHandleChange(e.target.files[0], "product_image")} className="w-full text-black font-Poppins mb-2" />
                <input
                  type="text"
                  id="input-name"
                  defaultValue={data.product_name}
                  onChange={(e) => fnHandleChange(e.target.value, "product_name")}
                  placeholder="Product Name*"
                  className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                  required
                />
                <input
                  type="text"
                  id="input-unit"
                  defaultValue={data.unit}
                  onChange={(e) => fnHandleChange(e.target.value, "unit")}
                  placeholder="Unit*"
                  className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    id="input-stock"
                    defaultValue={data.stock}
                    onChange={(e) => fnHandleChange(e.target.value, "stock")}
                    placeholder="Stock*"
                    className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                    required
                  />
                  <input
                    type="number"
                    id="input-price"
                    defaultValue={data.price}
                    onChange={(e) => fnHandleChange(e.target.value, "price")}
                    placeholder="Price*"
                    className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                    required
                  />
                </div>
                <div className="modal-action font-Roboto">
                  <button id="btn-edit" type="submit" className="btn btn-primary btn-sm w-20 text-white">
                    Edit
                  </button>
                  <button
                    id="btn-cancel"
                    type="reset"
                    onClick={() => {
                      setShowModal({ view: false });
                    }}
                    className="btn btn-secondary btn-sm w-20 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          ) : (
            <section>
              <p className="text-black font-Roboto font-medium">Are you sure you want to delete this product ?</p>
              <div className="modal-action font-Roboto">
                <button id="btn-delete" onClick={(e) => handleDelete(e, data.id)} className="btn btn-primary btn-sm w-20 text-white">
                  Yes
                </button>
                <button
                  id="btn-no"
                  type="button"
                  onClick={() => {
                    setShowModal({ view: false });
                  }}
                  className="btn btn-secondary btn-sm w-20 text-white"
                >
                  No
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default CardProduct;
