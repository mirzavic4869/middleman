import React, { useState, useEffect } from "react";
import CardHistoryProductOut from "../../components/CardHistoryProductOut";
import Navbar from "../../components/Navbar";
import { getCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

function HistoryProductIn() {
	const token = getCookie("token");
	const role = getCookie("role");
	const router = useRouter();
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState([]);

	useEffect(() => {
		if (!token) {
			router.push("/auth/welcome");
		}
		if (role === "user") {
			router.push("/");
		}
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/admins/inventory",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					if (data === null) {
						setDatas(null);
					} else {
						setDatas(data.reverse());
					}
				}
			})
			.catch((error) => alert(error.toString()))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Navbar />
			<div className="m-4">
				<h1 className="text-black font-Roboto font-semibold text-4xl my-10">
					History Product In
				</h1>
				{datas ? (
					loading ? (
						<div className="text-center">Loading...</div>
					) : (
						<div className="grid grid-cols-1 gap-2 lg:grid-cols-3 my-4">
							{datas.map((value) => (
								<CardHistoryProductOut key={value.inventory_id} data={value} />
							))}
						</div>
					)
				) : (
					<div className="flex  justify-center items-center text-lg md:text-3xl font-Roboto font-bold text-slate-700/20">
						Empty data
					</div>
				)}
			</div>
		</>
	);
}

export default HistoryProductIn;
