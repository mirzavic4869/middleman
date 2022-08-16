import React from "react";
import { formatDate } from "../pages/history-product-out";
import Link from "next/dist/client/link";

export default function CardHistoryProductOut({ data }) {
  return (
    <>
      <div className="flex items-center justify-between bg-white shadow-md p-2 text-black font-Poppins rounded-lg">
        <div className="flex-col">
          <div>ID</div>
          <div>{data.inventory_id}</div>
        </div>
        <div className="flex-col">
          <div>Date</div>
          <div>{formatDate(data.date)}</div>
        </div>
        <Link href={`/detail-product-out/${data.inventory_id}`}>
          <button id="to-detail" className="btn btn-sm btn-primary modal-button text-white font-Roboto ">
            Detail
          </button>
        </Link>
      </div>
    </>
  );
}
