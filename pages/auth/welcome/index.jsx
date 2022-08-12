import { AddButton, AddButton2 } from "../../../components/CustomButton";
import Image from "next/image";

import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

import store from "../../../assets/store.png";
import logo from "../../../assets/logo.png";

export default function Welcome() {
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="text-center min-h-screen flex justify-center items-center">
      <div className="h-1/2 ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-72 md:w-[50rem] relative">
            <Image src={logo} alt="logo" />
          </div>
          <div className="w-72 md:w-96">
            <Image src={store} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-96 lg:w-[432px]">
            <AddButton
              id="to-login"
              onClick={() => router.push("/auth/login")}
              title="sign in"
            />
            <AddButton2
              id="to-register"
              onClick={() => router.push("/auth/register")}
              title="sign up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
