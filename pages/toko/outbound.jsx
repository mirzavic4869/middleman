import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { OutBound } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import Link from "next/link";

function Outbound() {
	const token = getCookie("token");
	const router = useRouter();
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState(false);

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

		fetch("https://postme.site/inoutbounds", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					console.log(data);
					if (data.items === null) {
						setDatas(null);
					} else {
						data.items.forEach((element) => {
							element.amount = 1;
						});
						setDatas(data.items.reverse());
					}
				}
			})
			.catch((error) => alert(error.toString))
			.finally(() => setLoading(false));
	};

	const handleQty = (data, type) => {
		let temp = datas.slice();
		type === "increment" ? data.amount++ : data.amount--;
		if (data.amount < 1) {
			data.amount = 1;
		}
		if (data.amount > data.qty) {
			data.amount = data.qty;
		}
		setDatas(temp);
	};

	const addData = async (e, key, qty, unit) => {
		e.preventDefault();
		// const body = {
		// 	product_id: key,
		// 	qty: qty,
		// 	unit: unit,
		// };
		const requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: datas.items,
		};

		fetch("https://postme.site/users/inventory", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				alert(message);
			})
			.catch((error) => alert(error.toString))
			.finally(() => {
				fetchData();
			});
	};

	const deleteData = async (e, idProduct) => {
		e.preventDefault();
		const requestOptions = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(`https://postme.site/inoutbounds/${idProduct}`, requestOptions)
			.then((result) => {
				alert("Success delete product");
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				fetchData();
			});
	};

	return (
		<div className="bg-base-100 h-screen w-full">
			<Navbar />
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-3 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
					Outbound Product
				</h1>
			</div>
			<div className="flex justify-end m-3">
				<button
					id="to-history-outbound"
					onClick={() => router.push("/history-product-out")}
					className="btn btn-primary btn-sm text-white font-Roboto"
				>
					History Product Out
				</button>
			</div>
			{datas ? (
				loading ? (
					<div className="text-center">Loading...</div>
				) : (
					<div className="grid grid-cols-1 m-3 gap-2 md:grid-cols-2 lg:grid-cols-3">
						{datas.map((data) => (
							<OutBound
								key={data.product_id}
								id={data.product_id}
								name={data.product_name}
								unit={data.unit}
								qty={data.qty}
								fnDeleteData={deleteData}
								loading={loading}
								amount={data.amount}
								handleQty={(type) => handleQty(data, type)}
							/>
						))}
					</div>
				)
			) : (
				<div className="text-center">Please add your products</div>
			)}
			<div className="fixed bottom-0 right-0 m-3">
				<button
					id="btn-submit"
					onClick={(e) => addData(e)}
					className={`btn btn-primary ${
						datas ? null : "btn-disabled"
					} btn text-white font-Roboto`}
				>
					Submit
				</button>
			</div>
		</div>
	);
}

export default Outbound;
