import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { OutBound } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

function Outbound() {
	const token = getCookie("token");
	const router = useRouter();
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState(false);

	const items = [];
	datas.map((item) =>
		items.push({
			product_id: item.product_id,
			qty: item.amount,
			unit: item.unit,
		})
	);

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
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/inoutbounds",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					if (data.length === 0) {
						setDatas([]);
					} else {
						data.forEach((element) => {
							element.amount = 1;
						});
						setDatas(data.reverse());
					}
				}
			})
			.catch((error) => alert(error.toString()))
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

	const addData = async (e) => {
		e.preventDefault();

		const body = { items: items };

		const requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};

		fetch(
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/users/inventory",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				alert(message);
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				fetchData();
				router.push(`/inventory`);
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

		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/inoutbounds/${idProduct}`,
			requestOptions
		)
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
			{datas.length !== 0 ? (
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
				<div className="flex  justify-center items-center text-lg md:text-3xl font-Roboto font-bold text-slate-700/20">
					Add your outbound
				</div>
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
