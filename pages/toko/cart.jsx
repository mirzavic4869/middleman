import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

import { MyCart } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { formatCurrency } from "../inventory";

function Cart() {
	const token = getCookie("token");
	const router = useRouter();
	const [total, setTotal] = useState([]);
	const [loading, setLoading] = useState(false);
	const [datas, setDatas] = useState([]);
	const [payment, setPayment] = useState({});

	const items = [];
	{
		datas.map((item) => items.push(item));
	}

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
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					console.log(data);
					setDatas(data.items.reverse());
					setPayment(data);
					setTotal(data);
				}
			})
			.catch((error) => alert(error.toString()))
			.finally(() => setLoading(false));
	};

	// update qty
	const handleQty = (data, type) => {
		setLoading(true);
		if (type === "increment") {
			data.qty++;
		} else {
			data.qty--;
		}

		const formData = new FormData();
		formData.append("qty", data.qty);

		const requestOptions = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		};

		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts/${data.product_id}`,
			requestOptions
		)
			.then((response) => response.json())
			.catch((error) => alert(error.toString()))
			.finally(() => {
				fetchData();
				setLoading(false);
			});
	};

	// delete cart
	const handleDelete = async (e, product_id) => {
		setLoading(true);
		e.preventDefault();
		const requestOptions = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts/${product_id}`,
			requestOptions
		)
			.then((result) => {
				alert("success delete product");
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				fetchData();
				setLoading(false);
			});
	};

	// payment
	const handlePayment = async () => {
		setLoading(true);
		const body = { grand_total: payment.grand_total, items: payment.items };
		var requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};
		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/users`,
			requestOptions
		).then((response) =>
			response
				.json()
				.then((result) => {
					const { code, message, data } = result;
					if (code === 201) {
						alert(message);
						router.push(`/payment/${data.token}`);
					}
				})
				.catch((err) => {
					alert(err.toString());
				})
				.finally(setLoading(false))
		);
	};

	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
					My Cart
				</h1>
			</div>
			<div className="mx-5 gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				{datas.map((data) => (
					<MyCart
						key={data.product_id}
						id={data.product_id}
						image={data.product_image}
						name={data.product_name}
						unit={data.unit}
						price={data.price}
						qty={data.qty}
						subtotal={data.subtotal}
						loading={loading}
						handleQty={(type) => handleQty(data, type)}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			{datas.length === 0 ? (
				<div className="flex  justify-center items-center text-lg md:text-3xl font-Roboto font-bold text-slate-700/20">
					Add your cart
				</div>
			) : (
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md m-5 flex justify-between items-center font-Poppins font-semibold p-3 text-black text-lg">
					<p>Total Price {formatCurrency(total.grand_total)}</p>
					{loading ? (
						<button
							id="to-payment"
							className="py-2 px-8 btn btn-square loading btn-primary opacity-40 text-white rounded-[10px]"
							onClick={() => handlePayment()}
						></button>
					) : (
						<button
							id="to-payment"
							className="py-2 px-8 btn btn-primary text-white rounded-[10px]"
							onClick={() => handlePayment()}
						>
							Next
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default Cart;
