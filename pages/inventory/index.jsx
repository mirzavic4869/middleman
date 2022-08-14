import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";
import Navbar from "../../components/Navbar";
import { MdSearch } from "react-icons/md";
import Modal from "../../components/Modal";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

function Inventory() {
  const token = getCookie("token");
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState([]);
  const [objSubmit, setObjSubmit] = useState({});

  useEffect(() => {
    if (!token) {
      router.push("/auth/welcome");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
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
          setDatas(data);
        }
      })
      .catch((error) => alert(error.toString))
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
      })
      .catch((error) => alert(error.toString))
      .finally(() => {
        setLoading(false);
        fetchData();
      });
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  if (loading) {
    return <div className="text-center">Loading</div>;
  }
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
        <label id="btn-add" htmlFor="modal-add" className="btn btn-sm btn-primary modal-button text-white font-Roboto">
          Add Product
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2 m-2 md:grid-cols-2 lg:grid-cols-3">
        {datas.map((value) => (
          <CardProduct key={value.id} data={value} fnFetchData={fetchData} />
        ))}
      </div>
      <Modal id="modal-add" title="Add Product" handleSubmit={addData} handleChange={handleChange} />
    </>
  );
}

export default Inventory;
