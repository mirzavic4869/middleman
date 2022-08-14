/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/dist/client/image";
import Link from "next/link";
import Head from "next/head";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

import { IoPersonCircle } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Modal from "./Modal";

import logo from "../assets/logo.png";

function Navbar() {
  const router = useRouter();
  const role = getCookie("role");

  const handlelogout = () => {
    deleteCookie("token");
    router.push("/auth/welcome");
  };

  return (
    <>
      <Head>
        <title>MIDDLEMAN</title>
        <meta name="description" content="Middleman website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="sticky z-10 top-0 w-full navbar bg-white shadow-md text-black flex justify-between items-center lg:px-10">
        <div>
          {/* humberger */}
          <div className="navbar-start lg:hidden">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost btn-square">
                <div className="w">
                  <HiOutlineMenuAlt2 size={25} />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-3 shadow bg-white rounded-box w-52 md:w-60 font-Roboto font-medium"
              >
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
                <li>
                  <Link href="/profile">
                    <a id="to-profile">My Profile</a>
                  </Link>
                </li>
                <li>
                  <label
                    className="btn btn-sm btn-secondary text-white mt-3 p-1"
                    id="btn-logout"
                    title="logout"
                    htmlFor="modal-logout"
                  >
                    Logout
                  </label>
                </li>
              </ul>
            </div>
          </div>

          {/* logo */}
          <div className="w-24 md:w-40">
            <Link href="/">
              <a id="to-dasboard">
                <Image src={logo} alt="logo" />
              </a>
            </Link>
          </div>
        </div>

        {/* navbar desktop */}
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
          <div className="dropdown dropdown-end mx-2 hidden lg:block">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <IoPersonCircle size={40} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 font-Roboto font-medium">
              <li>
                <Link href="/profile">
                  <a id="to-profile">My Profile</a>
                </Link>
              </li>
              <li>
                <label
                  className="btn btn-sm btn-secondary text-white mt-2 p-1"
                  id="btn-logout"
                  title="logout"
                  htmlFor="modal-logout"
                >
                  Logout
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal id="modal-logout" title="Logout" handleSubmit={handlelogout} />
    </>
  );
}

export default Navbar;
