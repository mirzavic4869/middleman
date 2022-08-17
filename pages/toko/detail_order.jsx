import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { DetailOrder } from "../../components/OrderCard";

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
	const response = await fetch(`https://postme.site/orders/1`, requestOptions);
	const data = await response.json();

	return {
		props: {
			code: data.code,
			data: data.data,
			message: data.message,
			token,
		},
	};
}

function Detail_order({ data }) {
	console.log(data);
	const [total, setTotal] = useState([]);
	const [id, setId] = useState([]);
	const [datas, setDatas] = useState([]);
	const token = getCookie("token");
	const router = useRouter();

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
					OD11092022000{id.order_id}
				</p>
			</div>
			<div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 mx-auto">
				{data.data.map((data) => (
					<DetailOrder
						key={data.product.id}
						name={data.product.product_name}
						price={data.product.price}
						qty={data.product.qty}
					/>
				))}
			</div>
			<div className="p-5">
				<div className="w-auto h-auto  bg-white rounded-[10px] shadow-md font-Poppins font-semibold p-3 text-black flex justify-between mx-5">
					<p>Total Price</p>
					<p>Rp {total.grand_total}</p>
				</div>
			</div>
		</div>
	);
}

export default Detail_order;
