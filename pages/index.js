import Navbar from "../components/Navbar";
import { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { getCookie } from "cookies-next";
import { MdSearch } from "react-icons/md";

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
		`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/admins/products`,
		requestOptions
	);
	const data = await response.json();
	return {
		props: {
			code: data.code,
			data: data.data.reverse(),
			message: data.message,
			token,
		},
	};
}
export default function Home({ data }) {
	const token = getCookie("token");
	const [loading, setLoading] = useState(false);
	const [qty] = useState(1);
	const [datas, setDatas] = useState(data);
	const [inputData, setInputData] = useState("");

	const handleSubmit = async (e, key) => {
		setLoading(true);
		e.preventDefault();
		const body = {
			product_id: key,
			qty: qty,
		};
		var requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};

		fetch(
			"https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/carts",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				alert(message);
			})
			.catch((error) => alert(error.toString()))
			.finally(() => setLoading(false));
	};

	const searchData = async (e, productName) => {
		setLoading(true);
		e.preventDefault();
		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(
			`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/admins/products/search?productname=${productName}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				console.log(result);
				if (code === 200) {
					if (data.length === 0) {
						setDatas(null);
					} else {
						setDatas(data.reverse());
					}
				}
			})
			.catch((error) => alert(error.toString()))
			.finally(() => setLoading(false));
	};

	const inputOnChangeHandler = (event) => {
		setInputData(event.target.value);
	};

	return (
		<div className="bg-base-100 min-h-screen">
			<Navbar />
			<div>
				<h1 className="text-black font-Roboto font-semibold text-[30px] m-3 text-center md:text-[44px] lg:text-[44px] lg:text-left ">
					Dashboard
				</h1>
				<form onSubmit={(e) => searchData(e, inputData)}>
					<div className="flex justify-between gap-2 m-4">
						<div className="flex gap-2 w-96">
							<input
								type="text"
								id="input-search"
								value={inputData}
								onChange={inputOnChangeHandler}
								placeholder="Search..."
								className="input input-sm input-bordered input-primary w-full max-w-xs text-black font-Poppins"
							/>
							<button
								id="btn-search"
								title="Search"
								className="btn btn-sm btn-primary text-2xl text-white"
							>
								<MdSearch />
							</button>
						</div>
					</div>
				</form>
				{datas ? (
					<div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{datas.map((data) => (
							<DashboardCard
								key={data.id}
								id={data.id}
								image={data.product_image}
								name={data.product_name}
								unit={data.unit}
								stock={data.stock}
								price={data.price}
								handleSubmit={handleSubmit}
							/>
						))}
					</div>
				) : (
					<div className="flex  justify-center items-center text-lg md:text-3xl font-Roboto font-bold text-slate-700/20">
						Data not found
					</div>
				)}
			</div>
		</div>
	);
}
