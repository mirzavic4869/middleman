import React from "react";

export default function Modal(props) {
  return (
    <>
      {/* Modal */}
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">
            {props.title}
          </h3>
          {props.id === "modal-delete" || "modal-logout" ? (
            <section>
              {props.id === "modal-logout" ? (
                <p className="text-black font-Roboto font-medium">
                  Are you sure you want to logout ?
                </p>
              ) : (
                <p className="text-black font-Roboto font-medium">
                  Are you sure you want to delete this product ?
                </p>
              )}

              <div className="modal-action font-Roboto">
                <label
                  htmlFor={props.id}
                  onClick={props.onClick}
                  className="btn btn-primary btn-sm w-20 text-white"
                >
                  Yes
                </label>
                <label
                  htmlFor={props.id}
                  className="btn btn-secondary btn-sm w-20 text-white"
                >
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
              <input
                type="file"
                className="w-full text-black font-Poppins mb-2"
                required
              />
              <input
                type="text"
                placeholder="Product Name*"
                className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                required
              />
              <input
                type="text"
                placeholder="Unit*"
                className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                required
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Stock*"
                  className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Price*"
                  className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
                  required
                />
              </div>
              <div className="modal-action font-Roboto">
                <label
                  htmlFor={props.id}
                  className="btn btn-primary btn-sm w-20 text-white"
                >
                  {props.id === "modal-add" ? "Add" : "Edit"}
                </label>
                <label
                  htmlFor={props.id}
                  className="btn btn-secondary btn-sm w-20 text-white"
                >
                  Cancel
                </label>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
