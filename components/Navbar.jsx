/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/dist/client/image";

import logo from "../assets/logo.png";

function Navbar() {
  return (
    <>
      {/* <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col"> */}
      <div className="w-full navbar bg-white shadow-md text-black flex justify-around">
        <div>
          <div className="flex lg:hidden items-center">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="w-20 md:w-40">
            <Image src={logo} />
          </div>
        </div>
        {/* <div className="flex-1 px-2 mx-2">Middleman</div> */}
        <div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal font-Roboto font-medium">
              <li>
                <a>My Product</a>
              </li>
              <li>
                <a>My Cart</a>
              </li>
              <li>
                <a>History Order</a>
              </li>
              <li>
                <a>Product Out</a>
              </li>
            </ul>
          </div>
          <div className="mx-2">
            <input type="checkbox" className="toggle" />
          </div>
          <div className="dropdown dropdown-end mx-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" alt="avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 font-Roboto font-medium"
            >
              <li>
                <a>My Profile</a>
              </li>
              <li>
                <a>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
            <li>
              <a>My Product</a>
            </li>
            <li>
              <a>My Cart</a>
            </li>
            <li>
              <a>History Order</a>
            </li>
            <li>
              <a>Product Out</a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
}

export default Navbar;
