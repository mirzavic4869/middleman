import { AddButton } from "../../../components/CustomButton";
import InputCustom from "../../../components/InputCustom";

import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="min-h-screen flex justify-center flex-col items-center">
        <div className="hidden md:block my-10"></div>
        <div className="h-1/2 ">
          <div className="mb-10">
            <h1 className="text-black font-Roboto font-extrabold text-5xl md:text-6xl">
              Welcome!
            </h1>
            <h4 className="text-black/50 font-Roboto text-2xl italic md:text-3xl">
              Sign in to continue
            </h4>
          </div>
          <InputCustom placeholder="Email" />
          <InputCustom placeholder="Password" />
          <div className="mt-2 w-full">
            <AddButton id="btn-login" title="sign in" />
          </div>
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
