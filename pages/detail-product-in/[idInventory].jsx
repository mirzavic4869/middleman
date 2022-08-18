import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { getCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

function DetailProductIn() {
  const token = getCookie("token");
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    if (!token) {
      router.push("/auth/welcome");
    }
    if (role === "user") {
      router.push("/");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { idInventory } = router.query;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://virtserver.swaggerhub.com/vaniliacahya/capstone/1.0.0/admins/inventory/${idInventory}`, requestOptions)
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

  return (
    <>
      <Navbar />
      <div className="m-4">
        <div title="Title">
          <h1 className="text-black font-Roboto font-semibold text-4xl">Detail Product In</h1>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto my-4">
            <table className="table w-full font-Poppins text-black">
              <thead>
                <tr>
                  <th className="bg-[#EEEEEE]">ID</th>
                  <th className="bg-[#EEEEEE]">Product Name</th>
                  <th className="bg-[#EEEEEE]">Unit</th>
                  <th className="bg-[#EEEEEE]">QTY</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {datas.map((value) => (
                  <tr key={value.product_id}>
                    <td>{value.product_id}</td>
                    <td>{value.product_name}</td>
                    <td>{value.unit}</td>
                    <td>{value.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailProductIn;
