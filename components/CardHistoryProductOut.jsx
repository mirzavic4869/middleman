import React from "react";

export default function CardHistoryProductOut() {
  return (
    <>
      <div className="flex items-center justify-between bg-white shadow-md p-2 text-black font-Poppins rounded-lg">
        <div className="flex-col">
          <div>ID</div>
          <div>12356789</div>
        </div>
        <div className="flex-col">
          <div>Date</div>
          <div>11 Agustus 2022</div>
        </div>
        <label htmlFor="modal-add" className="btn btn-sm btn-primary modal-button text-white font-Roboto ">
          Detail
        </label>
      </div>
    </>
  );
}
