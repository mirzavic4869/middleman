import React from "react";
import Navbar from "../../components/Navbar";

function History_order() {
	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					History Order Product
				</h1>
				<div className="mx-auto md:mx-16">
					<table className="w-full table-fixed font-Poppins">
						<thead>
							<tr className="bg-[#EEEEEE] text-xs md:text-lg lg:text-lg font-bold text-black">
								<td className="py-2 pl-2">ID</td>
								<td className="py-2">DATE</td>
								<td className="py-2">PRODUCT NAME</td>
								<td className="py-2">STATUS</td>
								<td className="py-2">TOTAL PRICE</td>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white text-xs md:text-lg lg:text-lg  text-black border-b-2 border-neutral-400 ">
								<td className="py-3 pl-2">1</td>
								<td className="py-3">20/07/2022</td>
								<td className="py-3">Beras Wangi</td>
								<td className="py-3">Pengiriman</td>
								<td className="py-3">Rp 299.000</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default History_order;
