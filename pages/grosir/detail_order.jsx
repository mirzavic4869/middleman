import React from "react";
import Navbar from "../../components/Navbar";

function Detail_order() {
	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					Detail Order Product
				</h1>
			</div>
			<div className="text-black font-Poppins font-semibold">
				<p className="border-b-2 pb-4 border-black mx-auto text-center text-xl md:text-2xl lg:text-3xl">
					OD26798764141001
				</p>
			</div>
			<div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1">
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md font-Poppins font-semibold p-5 text-black">
					<p>Beras Wangi</p>
					<p>Sub Total : Rp 40.000 x 3 = Rp 120.000</p>
				</div>
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md font-Poppins font-semibold p-5 text-black">
					<p>Gula Pasir</p>
					<p>Sub Total : Rp 12.000 x 4 = Rp 48.000</p>
				</div>
			</div>
			<div className="p-5 md:flex lg:flex">
				<div className="w-auto h-auto  bg-white rounded-[10px] shadow-md font-Poppins font-semibold p-3 text-black flex justify-between">
					<p>Total Price</p>
					<p className="md:ml-28">Rp 168.000</p>
				</div>
				<button className="mx-3 py-2 px-8 bg-[#1DB468] text-white rounded-[10px]">
					Accept
				</button>
				<button className="py-2 px-8 bg-[#1DB468] text-white rounded-[10px]">
					Done
				</button>
			</div>
		</div>
	);
}

export default Detail_order;
