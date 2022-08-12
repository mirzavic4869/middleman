/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/dist/client/image";
import { IoPersonCircle } from "react-icons/io5";
import Link from "next/link";

import logo from "../assets/logo.png";

function Navbar() {
  return (
    <>
      <div className="sticky top-0 w-full navbar bg-white shadow-md text-black flex justify-between lg:px-10">
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
            <Link href="/">
              <a id="to-dasboard">
                <Image src={logo} />
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal font-Roboto font-medium">
              <li>
                <Link href="/inventory">
                  <a id="to-inventory">My Product</a>
                </Link>
              </li>
              <li>
                <Link href="/toko/cart">
                  <a id="to-cart">My Cart</a>
                </Link>
              </li>
              <li>
                <Link href="/toko/history_order">
                  <a id="to-history-order">History Order</a>
                </Link>
              </li>
              <li>
                <Link href="/history-product-out">
                  <a id="to-history-product-out">Product Out</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mx-2">
            <input type="checkbox" className="toggle" />
          </div>
          <div className="dropdown dropdown-end mx-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <IoPersonCircle size={40} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 font-Roboto font-medium"
            >
              <li>
                <Link href="/profile">
                  <a id="to-profile">My Profile</a>
                </Link>
              </li>
              <li>
                <button>Sign Out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
