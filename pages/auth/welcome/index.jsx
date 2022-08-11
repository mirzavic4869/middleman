import { AddButton, AddButton2 } from "../../../components/customButton";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import store from "../../../assets/store.png";
import logo from "../../../assets/logo.png";

export default function Welcome() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/auth/register");
  };

  return (
    <div className="text-center min-h-screen flex justify-center items-center">
      <div className="h-1/2 ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-72 md:w-[50rem] relative">
            <Image src={logo} />
          </div>
          <div className="w-72 md:w-96">
            <Image src={store} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <AddButton
            onClick={() => router.push("/auth/login")}
            title="sign in"
          />
          <AddButton2
            onClick={() => router.push("/auth/register")}
            title="sign up"
          />
        </div>
      </div>
    </div>
  );
}
