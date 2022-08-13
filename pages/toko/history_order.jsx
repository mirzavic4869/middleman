import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

function History_order() {
	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					History Order Product
				</h1>
				<div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					<div className="w-auto h-auto bg-white rounded-[20px] shadow-md text-md md:text-lg lg:text-xl text-black font-Poppins font-medium p-5">
						<p className="pb-3">ID Order</p>
						<p className="pb-3">10 Juli 2022</p>
						<p className="pb-3">Terkirim</p>
						<p className="pb-3">Rp 399.000</p>
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
					<div className="w-auto h-auto bg-white rounded-[20px] shadow-md text-md md:text-lg lg:text-xl text-black font-Poppins font-medium p-5">
						<p className="pb-3">ID Order</p>
						<p className="pb-3">10 Juli 2022</p>
						<p className="pb-3">Terkirim</p>
						<p className="pb-3">Rp 399.000</p>
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
					<div className="w-auto h-auto bg-white rounded-[20px] shadow-md text-md md:text-lg lg:text-xl text-black font-Poppins font-medium p-5">
						<p className="pb-3">ID Order</p>
						<p className="pb-3">10 Juli 2022</p>
						<p className="pb-3">Terkirim</p>
						<p className="pb-3">Rp 399.000</p>
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
				</div>
			</div>
		</div>
	);
}

export default History_order;
