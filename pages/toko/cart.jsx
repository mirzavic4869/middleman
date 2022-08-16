import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Modal from "../../components/Modal";
import { MyCart } from "../../components/CartCard";
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
		"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts",
		requestOptions
	);
	const data = await response.json();
	if (response.status === 200) {
		return {
			props: {
				code: data.code,
				data: data.data.items,
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

function Cart({ data }) {
	const token = getCookie("token");
	const router = useRouter();
	const [total, setTotal] = useState([]);
	const [loading, setLoading] = useState();
	const [counter, setCounter] = useState(1);

	// update
	const handleSubmit = async (e, qty) => {
		setLoading(true);
		e.preventDefault();
		const body = { qty };

		let requestOptions = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};

		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts/1`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				location.reload();
				alert(message);
			})
			.catch((error) => {
				console.log(error);
				alert(error.toString());
			})
			.finally(() => setLoading(false));
	};

	const handleIncrement = () => {
		setCounter(counter + 1);
	};

	const handleDecrement = () => {
		setCounter(counter - 1);
	};

	// delete user
	const handleDelete = (e, product_id) => {
		setLoading(true);
		var requestOptions = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		fetch(
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts/1",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { message, code } = result;
				if (code === 200) {
					alert(message);
					deleteCookie("token");
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
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
				{data.map((data) => (
					<MyCart
						key={data.id}
						image={data.product_image}
						name={data.product_name}
						unit={data.unit}
						price={data.price}
						qty={data.qty}
						subtotal={data.subtotal}
						handleSubmit={handleSubmit}
						handleDelete={handleDelete}
						handleIncrement={handleIncrement}
						handleDecrement={handleDecrement}
					/>
				))}
				{/* <div className="relative">
					<div className="absolute top-0 -right-2 md:right-0 lg:-right-5">
						<label
							id="btn-delete"
							// htmlFor="modal-delete"
							className="p-2 btn btn-secondary text-white rounded-[10px]"
							onClick={() => handleDelete()}
						>
							Delete
						</label>
					</div>
				</div> */}
			</div>

			<div className="w-auto h-auto bg-white rounded-[20px] shadow-md m-5 flex justify-between font-Poppins font-semibold p-3 text-black text-lg">
				<p>Total Price Rp {total.grand_total}</p>
				<Link href="/toko/history_order">
					<button
						id="to-payment"
						className="py-2 px-8 btn btn-primary text-white rounded-[10px]"
					>
						Next
					</button>
				</Link>
			</div>
			{/* <Modal id="modal-delete" title="Delete Product" /> */}
		</div>
	);
}

export default Cart;
