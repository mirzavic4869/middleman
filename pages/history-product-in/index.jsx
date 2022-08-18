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

function HistoryProductIn() {
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
		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch("https://postme.site/admins/inventory", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					setDatas(data.reverse());
				}
			})
			.catch((error) => alert(error.toString))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Navbar />
			<div className="m-4">
				<h1 className="text-black font-Roboto font-semibold text-4xl my-10">
					History Product In
				</h1>
				{loading ? (
					<div className="text-center">Loading...</div>
				) : (
					<div className="grid grid-cols-1 gap-2 lg:grid-cols-3 my-4">
						{datas.map((value) => (
							<CardHistoryProductOut key={value.inventory_id} data={value} />
						))}
					</div>
				)}
			</div>
		</>
	);
}

export default HistoryProductIn;
