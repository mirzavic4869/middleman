import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";
import Navbar from "../../components/Navbar";
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

export const formatCurrency = (number) => {
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: Math.trunc(Math.abs(number)).toFixed().length,
  }).format(number);
  return currency;
};

function Inventory() {
  const token = getCookie("token");
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState([]);
  const [objSubmit, setObjSubmit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("");

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

    fetch("https://postme.site/users/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data } = result;
        if (code === 200) {
          if (data === null) {
            setDatas(null);
          } else {
            setDatas(data.reverse());
          }
        }
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const addData = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch("https://postme.site/users/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
        setObjSubmit({});
        setValue("");
      })
      .catch((error) => alert(error.toString()))
      .finally(() => {
        setLoading(false);
        setShowModal(false);
        fetchData();
      });
  };

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

    fetch(`https://postme.site/users/products/${idProduct}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
        setObjSubmit({});
      })
      .catch((error) => alert(error.toString()))
      .finally(() => {
        fetchData();
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

    fetch(`https://postme.site/users/products/${idProduct}`, requestOptions)
      .then((result) => {
        alert("success delete product");
      })
      .catch((error) => alert(error.toString()))
      .finally(() => {
        fetchData();
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
      .catch((error) => alert(error.toString()));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  return (
    <>
      <Navbar />
      <div className="m-4">
        <h1 className="text-black font-Roboto font-semibold text-4xl">My Product</h1>
      </div>
      <div className="flex justify-between gap-2 m-4">
        <div className="flex gap-2 w-96">
          <input type="text" placeholder="Search..." className="input input-sm input-bordered input-primary w-full max-w-xs text-black font-Poppins" />
          <button id="btn-search" title="Search" className="btn btn-sm btn-primary text-2xl text-white">
            <MdSearch />
          </button>
        </div>
        <button id="btn-add-modal" type="button" onClick={() => setShowModal(true)} className="btn btn-sm btn-primary modal-button text-white font-Roboto">
          Add Product
        </button>
      </div>
      {datas ? (
        loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-2 m-2 md:grid-cols-2 lg:grid-cols-3">
            {datas.map((value) => (
              <CardProduct key={value.id} data={value} fnEditData={editData} fnDeleteData={deleteData} fnHandleChange={handleChange} fnAddProductOut={addProductOut} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center">Please add your products</div>
      )}

      {/* Modal */}
      <input type="checkbox" id="modal" className="modal-toggle" checked={showModal} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">Add Product</h3>
          <label className="label">
            <span className="label-text text-primary text-base font-Poppins">
              Product Image<span className="text-secondary">*</span>
            </span>
          </label>
          <form id="form-add" onSubmit={(e) => addData(e)}>
            <input type="file" id="input-image" defaultValue={value} onChange={(e) => handleChange(e.target.files[0], "product_image")} accept="image/png, image/jpeg" className="w-full text-black font-Poppins mb-2" />
            <input
              type="text"
              id="input-name"
              defaultValue={value}
              onChange={(e) => handleChange(e.target.value, "product_name")}
              placeholder="Product Name*"
              className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
            />
            <input type="text" id="input-unit" defaultValue={value} onChange={(e) => handleChange(e.target.value, "unit")} placeholder="Unit*" className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2" />
            <div className="flex gap-2">
              <input
                type="number"
                id="input-stock"
                defaultValue={value}
                onChange={(e) => handleChange(e.target.value, "stock")}
                placeholder="Stock*"
                className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
              />
              <input
                type="number"
                id="input-price"
                defaultValue={value}
                onChange={(e) => handleChange(e.target.value, "price")}
                placeholder="Price*"
                className="input input-sm input-bordered input-primary w-full text-black font-Poppins my-2"
              />
            </div>
            <div className="modal-action font-Roboto">
              <button id="btn-add" className="btn btn-primary btn-sm w-20 text-white" disabled={loading}>
                Add
              </button>
              <button
                id="btn-cancel"
                type="reset"
                onClick={() => {
                  setShowModal(false);
                }}
                className="btn btn-secondary btn-sm w-20 text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Inventory;
