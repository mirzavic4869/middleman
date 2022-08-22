import Link from "next/link";
import { formatDate } from "../pages/history-product-out";
import { formatCurrency } from "../pages/inventory";

function HistoryAdminOrder(props) {
  return (
    <tbody>
      <tr className="bg-white text-xs md:text-lg lg:text-lg text-black border-b-2 border-neutral-400 ">
        <td className="py-2 hover:underline text-center">
          <Link href={`/grosir/${props.id}`}>
            <a>{props.id}</a>
          </Link>
        </td>
        <td className="py-2 text-center">{formatDate(props.date)}</td>
        <td className="py-2 text-center">{props.status}</td>
        <td className="py-2 text-right">{formatCurrency(props.total)}</td>
        <td className="py-2 text-center">
          <Link href={`/grosir/${props.id}`}>
            <button id="to-detail-order" className="btn btn-primary btn-sm text-white rounded-[10px]">
              Detail
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
}

function IncomingOrder(props) {
  return (
    <tbody>
      <tr className="bg-white text-xs md:text-lg lg:text-lg text-black border-b-2 border-neutral-400 text-center">
        <td className="py-2">{props.id}</td>
        <td className="py-2">{formatDate(props.date)}</td>
        <td className="py-2">{props.status}</td>
        <td className="py-2 text-right">{formatCurrency(props.total)}</td>
        <td className="py-2">
          <Link href={`/grosir/${props.id}`}>
            <button id="to-detail-order" className="btn btn-primary btn-sm text-white rounded-[10px]">
              Detail
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
}

export { IncomingOrder, HistoryAdminOrder };
