import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Modal from "../../components/Modal";
import { OutBound } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

function Outbound() {
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
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/inoutbounds",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					setDatas(data.items);
				}
				if (code === 200) {
					setTotal(data);
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
					<h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
						Out Bound Product
					</h1>
				</div>
				<div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
					{datas.map((data) => (
						<OutBound
							key={data.id}
							id={data.product_id}
							name={data.product_name}
							unit={data.unit}
							qty={data.qty}
						/>
					))}

					{/* <div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex m-2 justify-center">
					<img
						className="p-5 h-[200px] w-[140px]"
						src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
						alt="image"
					/>
					<div className="flex flex-col  font-Poppins font-medium   ">
						<div className="flex flex-row">
							<h2 className="py-2 pr-8 text-black">Beras Wangi</h2>
						</div>
						<h3 className="pb-4 text-black">5 Kg</h3>
						<h3 className="pb-4 text-black">Rp 40.000</h3>

						<div className="flex flex-row">
							<h3 className="pb-4 text-black">Ammount</h3>{" "}
							<button className="bg-white border-[#1DB468] border-2 rounded-[5px] w-[33px] h-[33px] ml-3 text-black">
								-
							</button>
							<p className="ml-3 text-black">3</p>
							<button className="bg-[#1DB468] rounded-[5px] w-[33px] h-[33px] text-white ml-3">
								+
							</button>
						</div>
						<h3 className="text-black">Total Rp 120.000</h3>
					</div>
					<div className="relative">
						<div className="absolute top-0 -right-3 lg:-right-10">
							<label
								id="btn-delete"
								htmlFor="modal-delete"
								className="p-2 btn btn-secondary text-white rounded-[10px]"
							>
								Delete
							</label>
						</div>
					</div>
				</div> */}
				</div>
				<Modal id="modal-delete" title="Delete Product" />
			</div>
		);
	}
}
export default Outbound;
