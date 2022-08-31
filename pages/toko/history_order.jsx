import React from "react";
import Navbar from "../../components/Navbar";
import { getCookie } from "cookies-next";
import { HistoryOrder } from "../../components/OrderCard";
import { formatCurrency } from "../inventory";

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
		`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/users`,
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

function History_order({ data }) {
	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					History Order Product
				</h1>
				{data ? (
					<div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{data.map((value) => (
							<HistoryOrder
								key={value.order_id}
								id={value.order_id}
								date={value.date}
								status={value.status}
								total={formatCurrency(value.grand_total)}
							/>
						))}
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

export default History_order;
