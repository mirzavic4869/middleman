import { AddButton } from "../../../components/CustomButton";
import InputCustom from "../../../components/InputCustom";

import Link from "next/link";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const token = getCookie("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("https://postme.site/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, data, message } = result;
        if (code === 200) {
          const { token, role } = data;
          setCookie("token", token);
          setCookie("role", role);
          if (role === "admin") {
            router.push("/grosir/my_product");
          } else {
            router.push("/");
          }
        }
        alert(message);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="min-h-screen flex justify-center flex-col items-center bg-base-100">
        <div className="hidden md:block my-10"></div>
        <div className="h-1/2 ">
          <div className="mb-10">
            <h1 className="text-black font-Roboto font-extrabold text-5xl md:text-6xl">Welcome!</h1>
            <h4 className="text-black/50 font-Roboto text-2xl italic md:text-3xl">Sign in to continue</h4>
          </div>

          {/* form login */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputCustom type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <InputCustom type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <div className="mt-2 w-full">
              <AddButton loading={loading} id="btn-login" title="sign in" />
            </div>
          </form>

          {/* under text */}
          <div className="flex mt-4 font-Poppins font-normal md:text-lg lg:justify-center lg:text-xl">
            <h5 className="text-black ">Don`t have account?</h5>
            <Link href="/auth/register">
              <a id="to-register" className="text-primary ml-2">
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
