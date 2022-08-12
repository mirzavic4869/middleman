import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

function Incoming_product() {
	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					Incoming Order Product
				</h1>
				<div className="mx-3 md:mx-16">
					<table className="w-full table-fixed">
						<thead>
							<tr className="bg-[#EEEEEE] text-xs md:text-lg lg:text-lg font-bold text-black">
								<td className="py-2 px-2">ID</td>
								<td className="py-2">DATE</td>
								<td className="py-2">STORE NAME</td>
								<td className="py-2">STATUS</td>
								<td className="py-2">TOTAL PRICE</td>
								<td className="py-2"></td>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white text-xs md:text-lg lg:text-lg font-bold text-black border-b-2 border-neutral-400 pb-3">
								<td className="py-2 px-2">1</td>
								<td className="py-2">20 Juli 2022</td>
								<td className="py-2">Maju Mapan</td>
								<td className="py-2">Pengiriman</td>
								<td className="py-2">Rp 299.000</td>
								<td className="py-2">
									<Link href="/grosir/detail_order">
										<button className="p-3 bg-[#1DB468] text-white rounded-[10px]">
											Detail
										</button>
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Incoming_product;
