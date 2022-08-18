import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { MyCart } from "../../components/CartCard";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";
import { formatCurrency } from "../../components/CardProduct";

// export async function getServerSideProps({ req, res }) {
// 	const token = getCookie("token", { req, res });
// 	if (!token) {
// 		return {
// 			redirect: {
// 				permanent: false,
// 				destination: "/auth/welcome",
// 			},
// 		};
// 	}

// 	const requestOptions = {
// 		method: "GET",
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	const response = await fetch("https://postme.site/carts", requestOptions);
// 	const data = await response.json();

// 	return {
// 		props: {
// 			code: data.code,
// 			data: data.data.items,
// 			message: data.message,
// 			token,
// 		},
// 	};
// }

function Cart() {
	const token = getCookie("token");
	const router = useRouter();
	const [total, setTotal] = useState([]);
	const [loading, setLoading] = useState();
	const [datas, setDatas] = useState([]);

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

    fetch("https://postme.site/carts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data } = result;
        if (code === 200) {
          setDatas(data.items.reverse());
        }
        if (code === 200) {
          setTotal(data);
        }
      })
      .catch((error) => alert(error.toString))
      .finally(() => setLoading(false));
  };

  // update qty
  const handleQty = (data, type) => {
    setLoading(true);
    if (type === "increment") {
      data.qty++;
    } else {
      data.qty--;
    }

    const formData = new FormData();
    formData.append("qty", data.qty);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(`https://postme.site/carts/${data.product_id}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => alert(error.toString))
      .finally(() => {
        fetchData();
        setLoading(false);
      });
  };

  // delete user
  const handleDelete = async (e, product_id) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://postme.site/carts/${product_id}`, requestOptions)
      .then((result) => {
        alert("success delete product");
      })
      .catch((error) => alert(error.toString))
      .finally(() => {
        fetchData();
      });
  };
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <div>
        <h1 className="font-Roboto font-semibold text-[30px] p-9 text-center md:text-[44px] lg:text-[44px] lg:text-left lg:ml-20 text-black">
          My Cart
        </h1>
      </div>
      <div className="mx-5 gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {datas.map((data) => (
          <MyCart
            key={data.product_id}
            id={data.product_id}
            image={data.product_image}
            name={data.product_name}
            unit={data.unit}
            price={data.price}
            qty={data.qty}
            subtotal={data.subtotal}
            loading={loading}
            handleQty={(type) => handleQty(data, type)}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <div className="w-auto h-auto bg-white rounded-[20px] shadow-md m-5 flex justify-between items-center font-Poppins font-semibold p-3 text-black text-lg">
        <p>Total Price {formatCurrency(total.grand_total)}</p>
        <Link href="/toko/history_order">
          <button
            id="to-payment"
            className="py-2 px-8 btn btn-primary text-white rounded-[10px]"
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
