import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { useRouter } from "next/dist/client/router";
import { deleteCookie, getCookie } from "cookies-next";

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
		`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/users/products`,
		requestOptions
	);
	const data = await response.json();
	if (response.status === 200) {
		return {
			props: { code: data.code, data: data.data, message: data.message, token },
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
export default function Home({ data }) {
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

	// 	fetch("https://postme.site/users/products", requestOptions)
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

	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					Dashboard
				</h1>
				<div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{data.map((data) => (
						<DashboardCard
							key={data.id}
							image={data.product_image}
							name={data.product_name}
							unit={data.unit}
							stock={data.stock}
							price={data.price}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
