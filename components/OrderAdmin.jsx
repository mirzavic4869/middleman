import Link from "next/link";
import { formatDate } from "../pages/history-product-out";
import { formatCurrency } from "./CardProduct";

function HistoryAdminOrder(props) {
  return (
    <div className="mx-auto">
      <table className="w-full table-fixed font-Poppins">
        <tbody>
          <tr className="bg-white text-xs md:text-lg lg:text-lg  text-black border-b-2 border-neutral-400 ">
            <td className="py-2 pl-5">{props.id}</td>
            <td className="py-2">{formatDate(props.date)}</td>
            <td className="py-2">{props.status}</td>
            <td className="py-2">{formatCurrency(props.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function IncomingOrder(props) {
  return (
    <div className="mx-auto">
      <table className="w-full table-fixed font-Poppins">
        <tbody>
          <tr className="bg-white text-xs md:text-lg lg:text-lg text-black border-b-2 border-neutral-400 ">
            <td className="py-2 pl-5">{props.id}</td>
            <td className="py-2">{formatDate(props.date)}</td>
            <td className="py-2">{props.status}</td>
            <td className="py-2">{formatCurrency(props.total)}</td>
            <td className="py-2">
              <Link href={`/grosir/${props.id}`}>
                <button id="to-detail-order" className="btn btn-primary btn-sm text-white rounded-[10px]">
                  Detail
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { IncomingOrder, HistoryAdminOrder };
