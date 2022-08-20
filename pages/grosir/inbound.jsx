import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { OutBound } from "../../components/CartCard";
import { getCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

function Inbound() {
	const token = getCookie("token");
	const role = getCookie("role");
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

		fetch("https://postme.site/inoutbounds", requestOptions)
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

		fetch("https://postme.site/admins/inventory", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				alert(message);
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				fetchData();
				router.push(`/grosir/my_product`);
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

	const handleQty = (data, type) => {
		let temp = datas.slice();
		type === "increment" ? data.amount++ : data.amount--;
		if (data.amount < 1) {
			data.amount = 1;
		}
		setDatas(temp);
	};

	return (
		<div className="bg-base-100 w-full h-screen">
			<Navbar />
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-3 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
					Inbound Product
				</h1>
			</div>
			<div className="flex justify-end m-3">
				<button
					id="to-history-outbound"
					onClick={() => router.push("/history-product-in")}
					className="btn btn-primary btn-sm text-white font-Roboto"
				>
					History Product In
				</button>
			</div>
			{datas.length !== 0 ? (
				loading ? (
					<div className="text-center">Loading...</div>
				) : (
					<div className="grid gap-2 m-2 grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
						{datas.map((data) => (
							<OutBound
								key={data.product_id}
								id={data.product_id}
								name={data.product_name}
								unit={data.unit}
								qty={data.qty}
								amount={data.amount}
								fnDeleteData={deleteData}
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

export default Inbound;
