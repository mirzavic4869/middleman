import React from "react";

export default function Modal(props) {
  return (
    <>
      {/* Modal */}
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">{props.title}</h3>
          {props.title === "Delete Product" || props.id === "modal-logout" ? (
            <section>
              {props.id === "modal-logout" ? <p className="text-black font-Roboto font-medium">Are you sure you want to logout ?</p> : <p className="text-black font-Roboto font-medium">Are you sure you want to delete this product ?</p>}
              <div className="modal-action font-Roboto">
                <label
                  htmlFor={props.id}
                  onClick={(e) => {
                    props.handleSubmit(e, props.product_id);
                  }}
                  className="btn btn-primary btn-sm w-20 text-white"
                >
                  Yes
                </label>
                <label htmlFor={props.id} className="btn btn-secondary btn-sm w-20 text-white">
                  No
                </label>
              </div>
            </section>
          ) : (
            <section>
              <label className="label">
                <span className="label-text text-primary text-base font-Poppins">
                  Product Image<span className="text-secondary">*</span>
                </span>
              </label>
              <form onSubmit={(e) => props.handleSubmit(e, props.product_id)}>
                <input type="file" id="input-image" onChange={(e) => props.handleChange(e.target.files[0], "product_image")} className="w-full text-black font-Poppins mb-2" />
                <input
                  type="text"
                  id="input-name"
                  defaultValue={props.product_name}
                  onChange={(e) => props.handleChange(e.target.value, "product_name")}
                  placeholder="Product Name*"
                  className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                  required
                />
                <input
                  type="text"
                  id="input-unit"
                  defaultValue={props.unit}
                  onChange={(e) => props.handleChange(e.target.value, "unit")}
                  placeholder="Unit*"
                  className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    id="input-stock"
                    defaultValue={props.stock}
                    onChange={(e) => props.handleChange(e.target.value, "stock")}
                    placeholder="Stock*"
                    className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                    required
                  />
                  <input
                    type="number"
                    id="input-price"
                    defaultValue={props.price}
                    onChange={(e) => props.handleChange(e.target.value, "price")}
                    placeholder="Price*"
                    className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                    required
                  />
                </div>
                <div className="modal-action font-Roboto">
                  <button className="btn btn-primary btn-sm w-20 text-white">{props.id === "modal-add" ? "Add" : "Edit"}</button>
                  <label htmlFor={props.id} className="btn btn-secondary btn-sm w-20 text-white">
                    Cancel
                  </label>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
