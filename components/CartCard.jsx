import Link from "next/link";

function MyCart(props) {
	return (
		<div class="card card-side bg-white shadow-md">
			<figure>
				<img src={props.image} alt="image" />
			</figure>
			<div class="card-body font-Poppins">
				<h2 class="card-title">{props.name}</h2>
				<p>{props.unit}</p>
				<p>Rp {props.price}</p>
				<p>Ammount</p>
				<div className="flex">
					<button
						className="bg-white btn btn-outline btn-primary rounded-[5px] w-[50px] text-black"
						onSubmit={(e) => props.handleSubmit(e, props.product_id)}
						onClick={() => props.handleDecrement()}
					>
						-
					</button>
					<p>{props.counter}</p>
					<button
						className="btn btn-primary rounded-[5px] w-[50px] text-white ml-8"
						onSubmit={(e) => props.handleSubmit(e, props.product_id)}
						onClick={() => props.handleIncrement()}
					>
						+
					</button>
				</div>

				<div class="card-actions justify-end">
					<button
						class="btn btn-secondary text-white"
						onClick={(e) => props.handleDelete(e)}
						// htmlFor="modal-delete"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

function OutBound(props) {
	return (
		<div class="card card-side bg-white shadow-md">
			<figure>
				<img src={props.image} alt="image" />
			</figure>
			<div class="card-body font-Poppins">
				<h2 class="card-title">{props.name}</h2>
				<p>{props.unit}</p>
				<p>Rp {props.price}</p>
				<p>Ammount</p>
				<div className="flex">
					<button className="bg-white btn btn-outline btn-primary rounded-[5px] w-[50px]  text-black">
						-
					</button>
					<button className="btn btn-primary rounded-[5px] w-[50px] text-white ml-8">
						+
					</button>
				</div>

				<div class="card-actions justify-end">
					<button class="btn btn-secondary text-white">Delete</button>
				</div>
			</div>
		</div>
	);
}

export { MyCart, OutBound };
