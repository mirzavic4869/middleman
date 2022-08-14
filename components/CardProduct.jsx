/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "./Modal";
import { getCookie } from "cookies-next";

export const formatCurrency = (number) => {
  const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: Math.trunc(Math.abs(number)).toFixed().length }).format(number);
  return currency;
};

function CardProduct({ data, fnFetchData }) {
  const token = getCookie("token");
  const [objSubmit, setObjSubmit] = useState({});

  const editData = async (e, idProduct) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(`https://postme.site/users/products/${idProduct}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
        setObjSubmit({});
      })
      .catch((error) => alert(error.toString))
      .finally(() => {
        fnFetchData();
      });
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const deleteData = async (e, idProduct) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://postme.site/users/products/${idProduct}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => alert(error.toString))
      .finally(() => {
        fnFetchData();
      });
  };

  return (
    <>
      <div className="card card-side bg-base-100 shadow-lg m-2 text-black">
        <figure>
          <img src={data.product_image} className="h-48" alt="Product Image" />
        </figure>
        <div className="card-body">
          <div className="font-Poppins ">
            <h2 className="card-title text-base">{data.product_name}</h2>
            <h3 className="text-base">Unit: {data.unit}</h3>
            <h3 className="text-base">Stock: {data.stock}</h3>
            <p className="text-base">Price: {formatCurrency(data.price)}</p>
          </div>
          <div className="card-actions justify-start font-Roboto">
            <label id="btn-edit" title="Edit Product" htmlFor={`modal-edit${data.id}`} className="btn btn-primary btn-sm modal-button text-white">
              Edit
            </label>
            <label id="btn-delete" title="Delete Product" htmlFor={`modal-delete${data.id}`} className="btn btn-secondary btn-sm modal-button text-white">
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
      <Modal id={`modal-edit${data.id}`} title="Edit Product" product_id={data.id} product_name={data.product_name} unit={data.unit} stock={data.stock} price={data.price} handleSubmit={editData} handleChange={handleChange} />
      <Modal id={`modal-delete${data.id}`} title="Delete Product" product_id={data.id} handleSubmit={deleteData} />
    </>
  );
}

export default CardProduct;
