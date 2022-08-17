import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

function MyCart(props) {
  return (
    <div className="card card-side bg-white shadow-md">
      <figure>
        <img src={props.image} alt="image" />
      </figure>
      <div className="card-body font-Poppins">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.unit}</p>
        <p>Rp {props.price}</p>
        <p>Ammount</p>
        <p>{props.qty}</p>
        <p>{props.subtotal}</p>
        <div className="flex">
          <button className="bg-white btn btn-outline btn-primary rounded-[5px] w-[50px] text-black" onSubmit={(e) => props.handleSubmit(e, props.product_id)} onClick={() => props.handleDecrement()}>
            -
          </button>
          <p>{props.counter}</p>
          <button className="btn btn-primary rounded-[5px] w-[50px] text-white ml-8" onSubmit={(e) => props.handleSubmit(e, props.product_id)} onClick={() => props.handleIncrement()}>
            +
          </button>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-secondary text-white" onClick={(e) => props.handleDelete(e)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function OutBound(props) {
  return (
    <div className="card card-side bg-white shadow-md">
      <div className="card-body font-Poppins">
        <h2 className="card-title">{props.name}</h2>
        <p>Unit: {props.unit}</p>
        <p>Stock: {props.qty}</p>
        <div className="flex gap-2">
          {/* <button
            id="decrement"
            onClick={() => {
              setValue(value - 1);
              if (value <= 2) {
                setDisabledMinus(true);
              }
            }}
            className="bg-white btn btn-outline btn-primary rounded-[5px] w-[50px]  text-black"
            disabled={disabledMinus}
          >
            -
          </button> */}
          <p>Amount:</p>
          <input type="number" defaultValue={1} min={1} max={props.qty} className="w-full input input-sm input-bordered input-primary text-black font-Poppins" />
          {/* <button
            id="increment"
            onClick={() => {
              setValue(value + 1);
              if (value > props.qty) {
                setDisabledPlus(true);
              }
            }}
            className="btn btn-primary rounded-[5px] w-[50px] text-white ml-8"
            disabled={disabledPlus}
          >
            +
          </button> */}
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <button id="btn-delete" onClick={(e) => props.fnDeleteData(e, props.id)} title="Delete" className="p-2 rounded-bl-2xl modal-button text-white bg-secondary font-Roboto hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export { MyCart, OutBound };
