/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { formatCurrency } from "../pages/inventory";

function MyCart(props) {
  return (
    <div className="card card-side bg-white shadow-md">
      <figure>
        <img src={props.image} alt="image" />
      </figure>
      <div className="card-body font-Poppins">
        <h1 className="card-title">{props.name}</h1>
        <p>{`${props.qty} ${props.unit}`}</p>
        <p>{formatCurrency(props.price)}</p>

        <p>Amount</p>
        <div className="flex">
          <button
            className={props.qty <= 1 || props.loading ? "bg-white btn btn-outline btn-disabled btn-sm text-black text-lg" : "bg-white btn btn-outline btn-primary  btn-sm text-black text-lg"}
            onClick={() => props.handleQty("decrement")}
          >
            -
          </button>
          <p className="text-center w-20">{props.qty}</p>
          <button className={props.loading ? "btn  btn-disabled btn-primary btn-sm text-black text-lg" : "btn btn-primary btn-sm text-white text-lg"} onClick={() => props.handleQty("increment")}>
            +
          </button>
        </div>
        <p>Sub Total : {formatCurrency(props.subtotal)}</p>

        <div className="card-actions justify-end">
          <button id="btn-delete" className="btn btn-secondary text-white" onClick={(e) => props.handleDelete(e, props.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function OutBound(props) {
  return (
    <div className="card w-auto bg-white shadow-md">
      <div className="card-body font-Poppins">
        <div className="card-actions justify-end">
          <button id="btn-delete" onClick={(e) => props.fnDeleteData(e, props.id)} title="Delete" className="btn btn-secondary text-white font-Roboto rounded-full">
            Delete
          </button>
        </div>
        <h2 className="card-title">{props.name}</h2>
        <p>Unit: {props.unit}</p>
        <p>Stock: {props.qty}</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <div className="input-group">
            <button id="decrement" onClick={() => props.handleQty("decrement")} className="btn btn-outline btn-sm btn-primary text-lg">
              -
            </button>
            <input id="input-amount" type="number" value={props.amount} className="border input-sm input-primary w-20" />
            <button id="increment" onClick={() => props.handleQty("increment")} className="btn btn-primary btn-sm text-white text-lg">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MyCart, OutBound };
