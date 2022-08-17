import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { DetailOrder } from "../../components/OrderCard";
import { formatCurrency } from "../../components/CardProduct";

function Detail_order() {
  const [total, setTotal] = useState([]);
  const [id, setId] = useState([]);
  const [items, setItems] = useState([]);
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
    setLoading(true);
    const { idOrder } = router.query;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/${idOrder}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data } = result;
        if (code === 200) {
          setItems(data.items);
        }
        if (code === 200) {
          setTotal(data.grand_total);
        }
        if (code === 200) {
          setId(data.order_id);
        }
      })
      .catch((error) => alert(error.toString))
      .finally(() => setLoading(false));
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
        <div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 mx-auto">
          {items.map((data) => (
            <DetailOrder key={data.product_id} name={data.product_name} price={data.price} qty={data.qty} />
          ))}
        </div>
      )}
      <div className="p-5">
        <div className="w-auto h-auto bg-white rounded-[10px] shadow-md font-Poppins font-semibold p-3 text-black flex justify-between">
          <p>Total Price</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail_order;
