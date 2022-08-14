import Link from "next/link";

function HistoryOrder(props) {
	return (
		<div className="w-auto h-auto bg-white rounded-[20px] shadow-md text-md md:text-lg lg:text-xl text-black font-Poppins font-medium p-5">
			<p className="pb-3">ID Order : {props.id}</p>
			<p className="pb-3">Date : {props.date}</p>
			<p className="pb-3">Status : {props.status}</p>
			<p className="pb-3">Total Price : {props.total}</p>
			<div className="flex justify-end">
				<Link href="/toko/detail_order">
					<button
						id="to-detail_order"
						className="p-3 btn btn-primary text-white rounded-[10px]"
					>
						Detail
					</button>
				</Link>
			</div>
		</div>
	);
}

function DetailOrder(props) {
	return (
		<div>
			<div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 mx-auto">
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md font-Poppins font-semibold p-5 text-black">
					<p>{props.name}</p>
					<p>
						Sub Total : Rp {props.price} x {props.qty} = Rp 120.000
					</p>
				</div>
			</div>
		</div>
	);
}

export { HistoryOrder, DetailOrder };
