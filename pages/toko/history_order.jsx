import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { HistoryOrder } from "../../components/OrderCard";

function History_order() {
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState([]);
	const token = getCookie("token");
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.push("/auth/welcome");
		}
		fetchData();
	}, []);

	const fetchData = async () => {
		const requestOptions = {
			method: "GET",
		};

		fetch(
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/users",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					setDatas(data);
				}
			})
			.catch((error) => alert(error.toString))
			.finally(() => setLoading(false));
	};
	if (loading) {
		return <div>Please wait...</div>;
	} else {
		return (
			<div className="bg-base-100 min-h-screen">
				<Navbar />
				<div>
					<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
						History Order Product
					</h1>
					<div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{datas.map((data) => (
							<HistoryOrder
								key={data.id}
								id={data.order_id}
								date={data.date}
								status={data.status}
								total={data.grand_total}
							/>
						))}

						{/* <p className="pb-3">ID Order</p>
						<p className="pb-3">10 Juli 2022</p>
						<p className="pb-3">Terkirim</p>
						<p className="pb-3">Rp 399.000</p>
						<div className="flex justify-end">
							<Link href="/toko/detail_order">
								<button
									id="to-detail_order"
									className="p-3 btn btn-primary text-white rounded-[10px]"
								>
									Detail
								</button>
							</Link>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}
export default History_order;
