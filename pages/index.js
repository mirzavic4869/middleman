import Navbar from "../components/Navbar";
import { useState } from "react";
import DashboardCard from "../components/DashboardCard";
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
  const response = await fetch(`https://postme.site/admins/products`, requestOptions);
  const data = await response.json();
  return {
    props: { code: data.code, data: data.data.reverse(), message: data.message, token },
  };
}
export default function Home({ data }) {
  const token = getCookie("token");
  const [loading, setLoading] = useState(false);
  const [qty] = useState(1);

  const handleSubmit = async (e, key) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      product_id: key,
      qty: qty,
    };
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("https://postme.site/carts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => alert(error.toString))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <div>
        <h1 className="text-black font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20">Dashboard</h1>
        <div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((data) => (
            <DashboardCard key={data.id} id={data.id} image={data.product_image} name={data.product_name} unit={data.unit} stock={data.stock} price={data.price} handleSubmit={handleSubmit} />
          ))}
        </div>
      </div>
    </div>
  );
}
