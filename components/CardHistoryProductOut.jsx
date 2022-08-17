import React from "react";
import { formatDate } from "../pages/history-product-out";
import Link from "next/dist/client/link";
import { getCookie } from "cookies-next";

export default function CardHistoryProductOut({ data }) {
  const role = getCookie("role");
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
        <Link href={`${role === "admin" ? `/detail-product-in/${data.inventory_id}` : `/detail-product-out/${data.inventory_id}`}`}>
          <button id="to-detail" className="btn btn-sm btn-primary modal-button text-white font-Roboto ">
            Detail
          </button>
        </Link>
      </div>
    </>
  );
}
