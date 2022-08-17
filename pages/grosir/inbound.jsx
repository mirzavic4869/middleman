import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { OutBound } from "../../components/CartCard";
import { getCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

function Inbound() {
  const token = getCookie("token");
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

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

    fetch("https://postme.site/inoutbounds", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data } = result;
        if (code === 200) {
          setDatas(data.items);
        }
      })
      .catch((error) => alert(error.toString))
      .finally(() => setLoading(false));
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
    <div className="bg-base-100 w-full h-screen">
      <Navbar />
      <div>
        <h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">Inbound Product</h1>
      </div>
      {datas ? (
        loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid mx-5 gap-5 grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {datas.map((data) => (
              <OutBound key={data.product_id} id={data.product_id} name={data.product_name} unit={data.unit} qty={data.qty} fnDeleteData={deleteData} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center">Please add your products</div>
      )}
      <div className="fixed bottom-0 right-0 m-3">
        <button id="btn-submit" onClick={(e) => addData(e)} className="btn btn-primary text-white font-Roboto">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Inbound;
