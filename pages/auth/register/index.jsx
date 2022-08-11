import { AddButton } from "../../../components/customButton";
import InputCustom from "../../../components/inputCustom";

import Link from "next/link";
import Image from "next/image";

import logo from "../../../assets/logo.png";

export default function Register() {
  return (
    <>
      <div className="min-h-screen flex justify-center flex-col items-center">
        <div className="hidden md:block my-10">
          <Link href="/auth/welcome">
            <a>
              <Image src={logo} />
            </a>
          </Link>
        </div>
        <div className="h-1/2 ">
          <div className="mb-10">
            <h1 className="text-black font-Roboto font-extrabold text-5xl md:text-6xl">
              Hi!
            </h1>
            <h4 className="text-black/50 font-Roboto text-2xl italic md:text-3xl">
              Create a new account
            </h4>
          </div>
          <InputCustom type="text" placeholder="Name shop" />
          <InputCustom type="email" placeholder="Email" />
          <InputCustom type="number" placeholder="Phone Number" />
          <InputCustom type="password" placeholder="Password" />
          <InputCustom type="text" placeholder="Addres" />
          <div className="mt-2">
            <AddButton title="sign in" />
          </div>
          <div className="flex mt-4 lg:pb-10 font-Poppins font-normal md:text-lg lg:justify-center lg:text-xl">
            <h5 className="text-black ">Already have an account?</h5>
            <Link href="/auth/login">
              <a className="text-primary ml-2">Login</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
