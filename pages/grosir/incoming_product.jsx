import React from "react";
import Navbar from "../../components/Navbar";
import { IncomingOrder } from "../../components/OrderAdmin";

import { getCookie } from "cookies-next";

export async function getServerSideProps({ req, res }) {
	const token = getCookie("token", { req, res });
	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/auth/welcome",
			},
		};
	}
	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await fetch(
		`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/admins/incoming`,
		requestOptions
	);
	const data = await response.json();
	return {
		props: {
			code: data.code,
			data: data.data ? data.data.reverse() : null,
			message: data.message,
			token,
		},
	};
}

function Incoming_product({ data }) {
	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					Incoming Order Product
				</h1>
				{data ? (
					<div className="mx-auto md:mx-16">
						<table className="w-full table-fluid font-Poppins">
							<thead>
								<tr className="bg-[#EEEEEE] text-xs md:text-lg lg:text-lg font-bold text-black text-center">
									<td className="py-2">ID</td>
									<td className="py-2">DATE</td>
									<td className="py-2">STATUS</td>
									<td className="py-2">TOTAL PRICE</td>
									<td className="py-2"></td>
								</tr>
							</thead>
							{data.map((value) => (
								<IncomingOrder
									key={value.order_id}
									id={value.order_id}
									date={value.date}
									status={value.status}
									total={value.grand_total}
								/>
							))}
						</table>
					</div>
				) : (
					<div className="flex  justify-center items-center text-lg md:text-3xl font-Roboto font-bold text-slate-700/20">
						Empty data
					</div>
				)}
			</div>
		</div>
	);
}

export default Incoming_product;
