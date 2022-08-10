import { AddButton, DeleteButton } from "../../../components/customButton";
import Image from "next/image";

import store from "../../../assets/store.png";
import logo from "../../../assets/logo.png";

export default function Welcome() {
  return (
    <div className="text-center min-h-screen flex justify-center items-center bg-slate-500">
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
          <AddButton title="sign in" />
          <DeleteButton title="sign up" />
        </div>
      </div>
    </div>
  );
}
