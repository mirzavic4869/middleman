import React, { useState, useEffect } from "react";
import CardHistoryProductOut from "../../components/CardHistoryProductOut";
import Navbar from "../../components/Navbar";
import { getCookie } from "cookies-next";
import moment from "moment";
import { useRouter } from "next/dist/client/router";

export function formatDate(date) {
	const d = moment(date);
	return d.format("DD/MM/YYYY");
}

function HistoryProductOut() {
	const token = getCookie("token");
	const router = useRouter();
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState([]);

	useEffect(() => {
		if (!token) {
			router.push("/auth/welcome");
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
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/users/inventory",
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
					History Product Out
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
						Empty Data
					</div>
				)}
			</div>
		</>
	);
}

export default HistoryProductOut;
