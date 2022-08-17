import Link from "next/link";
import { formatDate } from "../pages/history-product-out";
import { formatCurrency } from "./CardProduct";

function HistoryOrder(props) {
  return (
    <div className="w-auto h-auto bg-white rounded-[20px] shadow-md text-md md:text-lg lg:text-xl text-black font-Poppins font-medium p-5">
      <p className="pb-3">ID Order : {props.id}</p>
      <p className="pb-3">Date : {formatDate(props.date)}</p>
      <p className="pb-3">Status : {props.status}</p>
      <p className="pb-3">Total Price : {props.total}</p>
      <div className="flex justify-end">
        <Link href={`/toko/${props.id}`}>
          <button id="to-detail_order" className="p-3 btn btn-primary text-white rounded-[10px]">
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
}

function DetailOrder(props) {
  return (
    <div className="w-auto h-auto bg-white rounded-[20px] shadow-md font-Poppins font-semibold p-3 text-black">
      <p>{props.name}</p>
      <p>
        Sub Total : {formatCurrency(props.price)} x {props.qty} = {formatCurrency(props.price * props.qty)}
      </p>
    </div>
  );
}

export { HistoryOrder, DetailOrder };
