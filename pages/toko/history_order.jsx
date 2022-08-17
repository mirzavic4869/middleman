import React from "react";
import Navbar from "../../components/Navbar";
import { getCookie } from "cookies-next";
import { HistoryOrder } from "../../components/OrderCard";
import { formatCurrency } from "../../components/CardProduct";

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
  const response = await fetch(`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/orders/users`, requestOptions);
  const data = await response.json();

  return {
    props: { code: data.code, data: data.data.reverse(), message: data.message, token },
  };
}

function History_order({ data }) {
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <div>
        <h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">History Order Product</h1>
        <div className="p-5 gap-4 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((data) => (
            <HistoryOrder key={data.order_id} id={data.order_id} date={data.date} status={data.status} total={formatCurrency(data.grand_total)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default History_order;
