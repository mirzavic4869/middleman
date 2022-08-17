/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { getCookie } from "cookies-next";

export const formatCurrency = (number) => {
	const currency = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumSignificantDigits: Math.trunc(Math.abs(number)).toFixed().length,
	}).format(number);
	return currency;
};

function CardProduct({ data, fnFetchData }) {
	const token = getCookie("token");
	const role = getCookie("role");
	const [objSubmit, setObjSubmit] = useState({});
	const [showModal, setShowModal] = useState({ title: "edit", view: false });
	let roles = "users";

	if (role === "admin") {
		roles = "admins";
	}

	const editData = async (e, idProduct) => {
		e.preventDefault();
		const formData = new FormData();
		for (const key in objSubmit) {
			formData.append(key, objSubmit[key]);
		}
		const requestOptions = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		};

		fetch(`https://postme.site/${roles}/products/${idProduct}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { message } = result;
				alert(message);
				setObjSubmit({});
			})
			.catch((error) => alert(error.toString))
			.finally(() => {
				setShowModal({ title: "edit", view: false });
				fnFetchData();
			});
	};

	const handleChange = (value, key) => {
		let temp = { ...objSubmit };
		temp[key] = value;
		setObjSubmit(temp);
	};

	const deleteData = async (e, idProduct) => {
		e.preventDefault();
		const requestOptions = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(`https://postme.site/${roles}/products/${idProduct}`, requestOptions)
			.then((result) => {
				alert("Berhasil hapus data");
			})
			.catch((error) => alert(error.toString()))
			.finally(() => {
				setShowModal({ title: "delete", view: false });
				fnFetchData();
			});
	};

	const addProductOut = async (e, idProduct, qty) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("product_id", idProduct);
		formData.append("qty", qty);

		const requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		};

		fetch(`https://postme.site/inoutbounds`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				alert("success creating a cart");
			})
			.catch((error) => alert(error.toString))
			.finally(() => {});
	};

	return (
		<>
			<div className="card card-side bg-white shadow-lg m-2 text-black">
				<figure>
					<img src={data.product_image} className="h-48" alt="Product Image" />
				</figure>
				<div className="card-body">
					<div className="font-Poppins ">
						<h2 className="card-title text-base">{data.product_name}</h2>
						<h3 className="text-base">Unit: {data.unit}</h3>
						<h3 className="text-base">Stock: {data.stock}</h3>
						<p className="text-base">Price: {formatCurrency(data.price)}</p>
					</div>
					<div className="card-actions justify-start font-Roboto">
						<button
							id="btn-edit"
							title="Edit Product"
							onClick={() => setShowModal({ title: "edit", view: true })}
							className="btn btn-primary btn-sm modal-button text-white"
						>
							Edit
						</button>
						<label
							id="btn-delete"
							title="Delete Product"
							onClick={() => setShowModal({ title: "delete", view: true })}
							className="btn btn-secondary btn-sm modal-button text-white"
						>
							Delete
						</label>
					</div>
				</div>
				<div className="relative">
					<div className="absolute top-0 right-0">
						<button
							id="btn-add"
							onClick={(e) => addProductOut(e, data.id, data.stock)}
							title="Add to Product Out"
							className="p-2 modal-button text-white bg-primary rounded-bl-2xl hover:bg-green-700"
						>
							<MdAdd size={20} />
						</button>
					</div>
				</div>
			</div>
			<input
				type="checkbox"
				className="modal-toggle"
				checked={showModal.view}
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="text-3xl text-primary my-3 font-Roboto font-medium">
						{showModal.title === "edit" ? "Edit Product" : "Delete Product"}
					</h3>
					{showModal.title === "edit" ? (
						<section>
							<label className="label">
								<span className="label-text text-primary text-base font-Poppins">
									Product Image<span className="text-secondary">*</span>
								</span>
							</label>
							<form onSubmit={(e) => editData(e, data.id)}>
								<input
									type="file"
									id="input-image"
									onChange={(e) =>
										handleChange(e.target.files[0], "product_image")
									}
									className="w-full text-black font-Poppins mb-2"
								/>
								<input
									type="text"
									id="input-name"
									defaultValue={data.product_name}
									onChange={(e) => handleChange(e.target.value, "product_name")}
									placeholder="Product Name*"
									className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
									required
								/>
								<input
									type="text"
									id="input-unit"
									defaultValue={data.unit}
									onChange={(e) => handleChange(e.target.value, "unit")}
									placeholder="Unit*"
									className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
									required
								/>
								<div className="flex gap-2">
									<input
										type="number"
										id="input-stock"
										defaultValue={data.stock}
										onChange={(e) => handleChange(e.target.value, "stock")}
										placeholder="Stock*"
										className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
										required
									/>
									<input
										type="number"
										id="input-price"
										defaultValue={data.price}
										onChange={(e) => handleChange(e.target.value, "price")}
										placeholder="Price*"
										className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
										required
									/>
								</div>
								<div className="modal-action font-Roboto">
									<button
										id="btn-edit"
										type="submit"
										className="btn btn-primary btn-sm w-20 text-white"
									>
										Edit
									</button>
									<button
										id="btn-cancel"
										type="reset"
										onClick={() => {
											setShowModal({ view: false });
										}}
										className="btn btn-secondary btn-sm w-20 text-white"
									>
										Cancel
									</button>
								</div>
							</form>
						</section>
					) : (
						<section>
							<p className="text-black font-Roboto font-medium">
								Are you sure you want to delete this product ?
							</p>
							<div className="modal-action font-Roboto">
								<button
									id="btn-yes"
									onClick={(e) => deleteData(e, data.id)}
									className="btn btn-primary btn-sm w-20 text-white"
								>
									Yes
								</button>
								<button
									id="btn-no"
									type="button"
									onClick={() => {
										setShowModal({ view: false });
									}}
									className="btn btn-secondary btn-sm w-20 text-white"
								>
									No
								</button>
							</div>
						</section>
					)}
				</div>
			</div>
		</>
	);
}

export default CardProduct;
