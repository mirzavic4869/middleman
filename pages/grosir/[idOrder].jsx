import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { DetailOrder } from "../../components/OrderCard";
import { formatCurrency } from "../inventory";

function Detail() {
  const [total, setTotal] = useState([]);
  const [id, setId] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const token = getCookie("token");
  const router = useRouter();
  const { idOrder } = router.query;

  useEffect(() => {
    if (!token) {
      router.push("/auth/welcome");
    }
    fetchData(idOrder);
  }, []);

  const fetchData = async (idOrder) => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://postme.site/orders/users/${idOrder}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data } = result;
        if (code === 200) {
          setItems(data.items);
          setTotal(data.grand_total);
          setId(data.id_order);
        }
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const confirmOrder = async (e, idOrder) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://postme.site/orders/confirm/${idOrder}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => {
        fetchData();
      });
  };

  const doneOrder = async (e, idOrder) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://postme.site/orders/done/${idOrder}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert("success done order");
      })
      .catch((error) => alert(error.toString()))
      .finally(() => {
        fetchData();
      });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <div>
        <h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">Detail Order Product</h1>
      </div>
      <div className="text-black font-Poppins font-semibold">
        <p className="border-b-2 pb-4 border-black mx-auto text-center text-xl md:text-2xl lg:text-3xl">Id Order : {id}</p>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="p-5 gap-2 grid grid-flow-row auto-rows-max grid-cols-1 mx-auto">
          {items.map((data) => (
            <DetailOrder key={data.product_id} name={data.product_name} subtotal={data.subtotal} qty={data.qty} />
          ))}
        </div>
      )}

      <div className="p-5 md:flex-1 lg:flex">
        <div className="basis-4/5 m-2 w-auto h-auto bg-white rounded-[10px] shadow-md font-Poppins font-semibold p-3 text-black flex justify-between ">
          <p>Total Price</p>
          <p className="md:ml-28">{formatCurrency(total)}</p>
        </div>
        <div className="flex m-2 justify-center gap-2">
          <button id="btn-confirm" onClick={(e) => confirmOrder(e, idOrder)} className="btn btn-primary text-white rounded-[10px]">
            Accept
          </button>

          <button id="btn-done" onClick={(e) => doneOrder(e, idOrder)} className="btn btn-primary text-white rounded-[10px]">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
