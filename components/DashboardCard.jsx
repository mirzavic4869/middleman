import Link from "next/link";

function DashboardCard(props) {
	return (
		<div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex flex-row m-2 justify-center">
			<img className="p-5 h-[250px] w-[180px]" src={props.image} alt="image" />
			<div className="flex flex-col p-5 font-Poppins font-semibold text-xl">
				<p className="pb-5 text-black">{props.id}</p>
				<p className="pb-5 text-black">{props.name}</p>
				<p className="pb-5 text-black">{props.unit}</p>
				<p className="pb-5 text-black">{props.stock}</p>
				<p className="pb-8 text-black">Rp {props.price}</p>
				{/* <Link href="/toko/cart"> */}
				<button
					id="to-cart"
					className="p-3 btn btn-primary text-white rounded-[20px]"
					onClick={(e) => props.handleSubmit(e, props.id)}
				>
					Add
				</button>
			</div>
		</div>
	);
}

export default DashboardCard;
