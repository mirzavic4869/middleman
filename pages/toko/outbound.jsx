import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Modal from "../../components/Modal";
import { OutBound } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

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
  const response = await fetch("https://postme.site/inoutbounds", requestOptions);
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

function Outbound() {
  const token = getCookie("token");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState([]);

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

    fetch("https://postme.site/inoutbounds", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data } = result;
        if (code === 200) {
          setDatas(data);
          console.log(data);
        }
      })
      .catch((error) => alert(error.toString))
      .finally(() => setLoading(false));
  };

  const addData = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: datas,
    };

    fetch("https://postme.site/users/inventory", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => alert(error.toString))
      .finally(() => {});
  };

  const deleteData = async (e, idProduct) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://postme.site/inoutbounds/${idProduct}`, requestOptions)
      .then((result) => {
        alert("Berhasil hapus data");
      })
      .catch((error) => alert(error.toString()))
      .finally(() => {
        fetchData();
      });
  };

  return (
    <div className="bg-base-100 h-screen w-full">
      <Navbar />
      <div>
        <h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">Out Bound Product</h1>
      </div>
      {datas ? (
        loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid mx-5 gap-5 grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
            {datas.items.map((data) => (
              <OutBound key={data.product_id} id={data.product_id} name={data.product_name} unit={data.unit} qty={data.qty} fnDeleteData={deleteData} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center">Please add your products</div>
      )}
      <div className="absolute bottom-0 right-0 m-3">
        <button id="btn-submit" onClick={(e) => addData(e)} className="btn btn-primary text-white font-Roboto">
          Submit
        </button>
      </div>
      <Modal id="modal-delete" title="Delete Product" />
    </div>
  );
}

export default Outbound;
