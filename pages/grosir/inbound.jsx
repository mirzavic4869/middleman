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
		"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/inoutbounds",
		requestOptions
	);
	const data = await response.json();
	if (response.status === 200) {
		return {
			props: {
				code: data.code,
				data: data.data.items,
				message: data.message,
				token,
			},
		};
	} else {
		deleteCookie("token");
		return {
			redirect: {
				permanent: false,
				destination: "/auth/welcome",
			},
		};
	}
}

function Inbound({ data }) {
	const [datas, setDatas] = useState([]);

	// useEffect(() => {
	// 	if (!token) {
	// 		router.push("/auth/welcome");
	// 	}
	// 	fetchData();
	// }, []);

	// const fetchData = async () => {
	// 	const requestOptions = {
	// 		method: "GET",
	// 	};

	// 	fetch("https://postme.site/inoutbounds", requestOptions)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			const { code, data } = result;
	// 			if (code === 200) {
	// 				setDatas(data.items);
	// 			}
	// 			if (code === 200) {
	// 				setTotal(data);
	// 			}
	// 		})
	// 		.catch((error) => alert(error.toString))
	// 		.finally(() => setLoading(false));
	// };

	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
					In Bound Product
				</h1>
			</div>
			<div className="grid mx-5 gap-5 grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				{data.map((data) => (
					<OutBound
						key={data.id}
						id={data.product_id}
						name={data.product_name}
						unit={data.unit}
						qty={data.qty}
					/>
				))}
			</div>
			<Modal id="modal-delete" title="Delete Product" />
		</div>
	);
}

export default Inbound;
