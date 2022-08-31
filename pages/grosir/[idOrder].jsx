import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { DetailOrder } from "../../components/OrderCard";
import { formatCurrency } from "../inventory";

function Detail() {
	const [total, setTotal] = useState([]);
	const [id, setId] = useState([]);
	const [status, setStatus] = useState([]);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState([]);
	const token = getCookie("token");
	const router = useRouter();
	const { idOrder } = router.query;

	useEffect(() => {
		if (!token) {
			router.push("/auth/welcome");
		}
		fetchData(idOrder);
	}, [idOrder]);

	const fetchData = async (id_order) => {
		setLoading(true);
		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(`https://postme.site/orders/users/${id_order}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					console.log(data);
					setItems(data.items);
					setTotal(data.grand_total);
					setId(data.id_order);
					setStatus(data.status);
				}
			})
			.catch((error) => alert(error.toString()))
			.finally(() => setLoading(false));
	};

	const confirmOrder = async (e, id_order) => {
		setLoading(true);
		e.preventDefault();
		const requestOptions = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(`https://postme.site/orders/confirm/${id_order}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				alert(message);
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				setStatus("on process");
				setLoading(false);
				fetchData(idOrder);
			});
	};

	const doneOrder = async (e, id_order) => {
		setLoading(true);
		e.preventDefault();
		const requestOptions = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/done/${id_order}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				alert("success done order");
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				setStatus("delivered");
				setLoading(false);
				fetchData(idOrder);
			});
	};

	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">
					Detail Order Product
				</h1>
			</div>
			<div className="text-black font-Poppins font-semibold">
				<p className="border-b-2 pb-4 border-black mx-auto text-center text-xl md:text-2xl lg:text-3xl">
					Id Order : {id}
				</p>
			</div>
			{loading ? (
				<div className="text-center">Loading...</div>
			) : (
				<div className="p-5 gap-2 grid grid-flow-row auto-rows-max grid-cols-1 mx-auto">
					{items.map((data) => (
						<DetailOrder
							key={data.product_id}
							name={data.product_name}
							subtotal={data.subtotal}
							qty={data.qty}
						/>
					))}
				</div>
			)}

			<div className="p-3 m-2 md:flex-1 lg:flex gap-2">
				<div className="w-full h-auto bg-white rounded-[10px] shadow-md font-Poppins font-semibold p-3 text-black flex justify-between ">
					<p>Total Price</p>
					<p className="md:ml-28">{formatCurrency(total)}</p>
				</div>
				<div className="m-3 lg:m-0 flex justify-center gap-2 font-Roboto">
					{status !== "delivered" &&
					status !== "pending" &&
					status !== "canceled" ? (
						status === "waiting confirmation" ? (
							<button
								id="btn-confirm"
								onClick={(e) => confirmOrder(e, idOrder)}
								className={`btn btn-primary ${
									loading ? "loading opacity-40" : null
								} text-white rounded-[10px]`}
							>
								Accept
							</button>
						) : (
							<button
								id="btn-done"
								onClick={(e) => doneOrder(e, idOrder)}
								className="btn btn-primary text-white rounded-[10px]"
							>
								Done
							</button>
						)
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Detail;
