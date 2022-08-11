import Head from "next/head";

export default function Home() {
	return (
		<div className="bg-[#F8F9FD] h-screen">
			<div className="navbar bg-neutral text-neutral-content">
				<a className="btn btn-ghost normal-case text-xl">MiddleMan</a>
			</div>
			<div>
				<h1 className="font-Roboto font-semibold text-[30px] p-5 text-center md:text-[50px] lg:text-left lg:ml-20">
					Dashboard
				</h1>
				<div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					<div className="w-[359px] h-[270px] bg-white rounded-[20px] shadow-md flex flex-row m-2 justify-center">
						<img
							className="p-5 h-[250px] w-[180px]"
							src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
							alt="image"
						/>
						<div className="flex flex-col p-5 font-Poppins font-semibold text-xl">
							<p className="pb-5">Beras Wangi</p>
							<p className="pb-5">5 Kg</p>
							<p className="pb-8">Rp 40.000</p>
							<button className="p-3 bg-[#1DB468] text-white rounded-[20px]">
								Add
							</button>
						</div>
					</div>
					<div className="w-[359px] h-[270px] bg-white rounded-[20px] shadow-md flex flex-row m-2 justify-center">
						<img
							className="p-5 h-[250px] w-[180px]"
							src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
							alt="image"
						/>
						<div className="flex flex-col p-5 font-Poppins font-semibold text-xl">
							<p className="pb-5">Beras Wangi</p>
							<p className="pb-5">5 Kg</p>
							<p className="pb-8">Rp 40.000</p>
							<button className="p-3 bg-[#1DB468] text-white rounded-[20px]">
								Add
							</button>
						</div>
					</div>
					<div className="w-[359px] h-[270px] bg-white rounded-[20px] shadow-md flex flex-row m-2 justify-center">
						<img
							className="p-5 h-[250px] w-[180px]"
							src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
							alt="image"
						/>
						<div className="flex flex-col p-5 font-Poppins font-semibold text-xl">
							<p className="pb-5">Beras Wangi</p>
							<p className="pb-5">5 Kg</p>
							<p className="pb-8">Rp 40.000</p>
							<button className="p-3 bg-[#1DB468] text-white rounded-[20px]">
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
