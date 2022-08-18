/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

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
          <button id="btn-delete" className="btn btn-secondary text-white" onClick={(e) => props.handleDelete(e)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function OutBound(props) {
  const [value, setValue] = useState(1);
  function Increment() {
    setValue(value + 1);
  }
  function Decrement() {
    setValue(value - 1);
  }

  useEffect(() => {
    if (value < 1) {
      setValue(0);
    }
    if (value > props.qty) {
      setValue(props.qty);
    }
  }, [value]);

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
            <button id="decrement" onClick={() => Decrement()} className="btn btn-outline btn-sm btn-primary text-lg">
              -
            </button>
            <input id="input-amount" type="number" value={value} className="border input-sm input-primary w-20" />
            <button id="increment" onClick={() => Increment()} className="btn btn-primary btn-sm text-white text-lg">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MyCart, OutBound };
