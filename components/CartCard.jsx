import Link from "next/link";

function MyCart(props) {
	return (
		<div className="w-auto h-auto bg-white rounded-[10px] shadow-md flex m-2 justify-center">
			<img className="p-5 h-[200px] w-[140px]" src={props.image} alt="image" />
			<div className="flex flex-col  font-Poppins font-medium   ">
				<div className="flex flex-row">
					<h2 className="py-2 pr-8 text-black">{props.name}</h2>
				</div>
				<h3 className="pb-4 text-black">{props.unit}</h3>
				<h3 className="pb-4 text-black">Rp {props.price}</h3>

				<div className="flex flex-row ">
					<h3 className="pb-2 text-black">Ammount</h3>{" "}
					<button className="bg-white btn btn-outline btn-primary rounded-[5px] w-[50px] ml-2 text-black">
						-
					</button>
					{/* <input type="number" /> */}
					<p className="ml-3 text-black">{props.qty}</p>
					<button className="btn btn-primary rounded-[5px] w-[50px] text-white ml-3">
						+
					</button>
				</div>
				<h3 className="text-black">Total Rp {props.subtotal}</h3>
			</div>
			<div className="relative">
				<div className="absolute top-0 -right-2 md:right-0 lg:-right-5">
					<label
						id="btn-delete"
						// htmlFor="modal-delete"
						className="p-2 btn btn-secondary text-white rounded-[10px]"
						onClick={() => handleDelete()}
					>
						Delete
					</label>
				</div>
			</div>
		</div>
	);
}

function OutBound(props) {
	return (
		<div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex  m-3 justify-between">
			<div className="flex flex-col  font-Poppins font-medium   ">
				<h2 className="px-5 py-2 text-black">{props.name}</h2>
				<h3 className="px-5 py-2 text-black">ID : {props.id}</h3>
				<h3 className="px-5 py-2 text-black">Unit : {props.unit}</h3>
				<h3 className="px-5 py-2 text-black">QTY : {props.qty}</h3>
			</div>
			<div className="relative">
				<div className="absolute top-0 right-0">
					<label
						id="btn-delete"
						htmlFor="modal-delete"
						className="p-2 btn btn-secondary text-white rounded-[10px]"
					>
						Delete
					</label>
				</div>
			</div>
		</div>
	);
}

export { MyCart, OutBound };
