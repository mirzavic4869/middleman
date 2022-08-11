import React from "react";

function cart() {
	return (
		<div>
			<div className="navbar bg-neutral text-neutral-content">
				<a className="btn btn-ghost normal-case text-xl">MiddleMan</a>
			</div>
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-5 text-center md:text-[50px] lg:text-left lg:ml-20">
					My Cart
				</h1>
			</div>
			<div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex m-2 justify-center">
					<img
						className="p-5 h-[200px] w-[140px]"
						src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
						alt="image"
					/>
					<div className="flex flex-col  font-Poppins font-medium text-md md:text-lg lg:text-xl ">
						<div className="flex flex-row">
							<p className="py-2 pr-8">Beras Wangi</p>
							<button className="p-2 bg-[#FF0000] text-white rounded-[10px]">
								Delete
							</button>
						</div>
						<p className="pb-4">5 Kg</p>
						<p className="pb-4">Rp 40.000</p>

						<div className="flex flex-row">
							<p className="pb-4">Ammount</p>{" "}
							<button className="bg-white border-[#1DB468] border-2 rounded-[5px] w-[33px] h-[33px] ml-3">
								-
							</button>
							<p className="ml-3">3</p>
							<button className="bg-[#1DB468] rounded-[5px] w-[33px] h-[33px] text-white ml-3">
								+
							</button>
						</div>
						<p>Total Rp 120.000</p>
					</div>
				</div>
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex m-2 justify-center">
					<img
						className="p-5 h-[200px] w-[140px]"
						src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
						alt="image"
					/>
					<div className="flex flex-col  font-Poppins font-medium text-md md:text-lg lg:text-xl ">
						<div className="flex flex-row">
							<p className="py-2 pr-8">Beras Wangi</p>
							<button className="p-2 bg-[#FF0000] text-white rounded-[10px]">
								Delete
							</button>
						</div>
						<p className="pb-4">5 Kg</p>
						<p className="pb-4">Rp 40.000</p>

						<div className="flex flex-row">
							<p className="pb-4">Ammount</p>{" "}
							<button className="bg-white border-[#1DB468] border-2 rounded-[5px] w-[33px] h-[33px] ml-3">
								-
							</button>
							<p className="ml-3">3</p>
							<button className="bg-[#1DB468] rounded-[5px] w-[33px] h-[33px] text-white ml-3">
								+
							</button>
						</div>
						<p>Total Rp 120.000</p>
					</div>
				</div>
				<div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex m-2 justify-center">
					<img
						className="p-5 h-[200px] w-[140px]"
						src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
						alt="image"
					/>
					<div className="flex flex-col  font-Poppins font-medium text-md md:text-lg lg:text-xl ">
						<div className="flex flex-row">
							<p className="py-2 pr-8">Beras Wangi</p>
							<button className="p-2 bg-[#FF0000] text-white rounded-[10px]">
								Delete
							</button>
						</div>
						<p className="pb-4">5 Kg</p>
						<p className="pb-4">Rp 40.000</p>

						<div className="flex flex-row">
							<p className="pb-4">Ammount</p>{" "}
							<button className="bg-white border-[#1DB468] border-2 rounded-[5px] w-[33px] h-[33px] ml-3">
								-
							</button>
							<p className="ml-3">3</p>
							<button className="bg-[#1DB468] rounded-[5px] w-[33px] h-[33px] text-white ml-3">
								+
							</button>
						</div>
						<p>Total Rp 120.000</p>
					</div>
				</div>
			</div>
			<div className="w-auto h-auto bg-white rounded-[20px] shadow-md flex m-2 justify-between font-Poppins font-semibold p-3">
				Total Price
			</div>
		</div>
	);
}

export default cart;
