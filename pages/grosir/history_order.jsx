import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HistoryAdminOrder from "../../components/OrderAdmin";
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
		`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/admins`,
		requestOptions
	);
	const data = await response.json();
	if (response.status === 200) {
		return {
			props: {
				code: data.code,
				data: data.data,
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

function History_order({ data }) {
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState([]);
	const token = getCookie("token");
	const router = useRouter();

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

	// 	fetch("https://postme.site/orders/admins", requestOptions)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			const { code, data } = result;
	// 			if (code === 200) {
	// 				setDatas(data);
	// 			}
	// 		})
	// 		.catch((error) => alert(error.toString))
	// 		.finally(() => setLoading(false));
	// };
	// if (loading) {
	// 	return <div>Please wait...</div>;
	// } else {
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
								<td className="py-2 pl-5">ID</td>
								<td className="py-2">DATE</td>
								<td className="py-2">STATUS</td>
								<td className="py-2">TOTAL PRICE</td>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white text-xs md:text-lg lg:text-lg  text-black border-b-2 border-neutral-400 ">
								{/* <td className="py-3 pl-2">1</td>
								<td className="py-3">20/07/2022</td>
								<td className="py-3">Beras Wangi</td>
								<td className="py-3">Pengiriman</td>
								<td className="py-3">Rp 299.000</td> */}
							</tr>
						</tbody>
					</table>
					{data.map((data) => (
						<HistoryAdminOrder
							key={data.id}
							id={data.order_id}
							date={data.date}
							status={data.status}
							total={data.grand_total}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default History_order;
