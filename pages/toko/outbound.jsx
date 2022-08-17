import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Modal from "../../components/Modal";
import { OutBound } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
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
		"https://postme.site/inoutbounds",
		requestOptions
	);
	const data = await response.json();

	return {
		props: {
			code: data.code,
			data: data.data.items,
			message: data.message,
			token,
		},
	};
}

function Outbound({ data }) {
	console.log(data);
	const [datas, setDatas] = useState([]);
	const token = getCookie("token");

	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
					Out Bound Product
				</h1>
			</div>
			<div className="grid mx-5 gap-5 grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				{data.items.map((data) => (
					<OutBound
						key={data.id}
						image={data.product_image}
						name={data.product_name}
						unit={data.unit}
						price={data.price}
						qty={data.qty}
						subtotal={data.subtotal}
					/>
				))}
			</div>
		</div>
	);
}

export default Outbound;
