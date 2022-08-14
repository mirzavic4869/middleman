import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

export default function Home() {
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

		fetch("https://postme.site/users/products", requestOptions)
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
						Dashboard
					</h1>
					<div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{datas.map((data) => (
							<DashboardCard
								key={data.id}
								image={data.product_image}
								name={data.product_name}
								unit={data.unit}
								stock={data.stock}
								price={data.price}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}
