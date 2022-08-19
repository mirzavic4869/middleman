/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Image from "next/dist/client/image";
import Link from "next/link";
import Head from "next/head";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

import { IoPersonCircle } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import logo from "../assets/logo.png";

function Navbar() {
  const router = useRouter();
  const role = getCookie("role");
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState({
    title: "MIDDLEMAN",
    myproduct: null,
    inventory: { link: "/inventory", title: "My Product" },
    cart: { link: "/toko/cart", title: "My Cart" },
    history: "/toko/history_order",
    outbound: (
      <li>
        <Link href="/toko/outbound">
          <a id="to-outbound">Outbound</a>
        </Link>
      </li>
    ),
    myprofile: (
      <li>
        <Link href="/profile">
          <a id="to-profile">My Profile</a>
        </Link>
      </li>
    ),
    link_logo: "/",
  });

  useEffect(() => {
    if (role === "admin") {
      setView({
        title: "MIDDLEMAN Admin",
        myproduct: (
          <li>
            <Link href="/grosir/my_product">
              <a id="to-my-product">My Product</a>
            </Link>
          </li>
        ),
        inventory: { link: "/grosir/incoming_product", title: "Incoming Product" },
        cart: { link: "/grosir/inbound", title: "Inbound" },
        history: "/grosir/history_order",
        outbound: null,
        myprofile: null,
        link_logo: "/grosir/my_product",
      });
    }
  }, []);

  const handlelogout = () => {
    deleteCookie("token");
    router.push("/auth/welcome");
  };

  return (
    <>
      <Head>
        <title>{view.title}</title>
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
                {view.myproduct}
                <li>
                  <Link href={view.inventory.link}>
                    <a id="to-inventory">{view.inventory.title}</a>
                  </Link>
                </li>
                <li>
                  <Link href={view.cart.link}>
                    <a id="to-cart">{view.cart.title}</a>
                  </Link>
                </li>
                <li>
                  <Link href={view.history}>
                    <a id="to-history-order">History Order</a>
                  </Link>
                </li>
                {view.outbound}
                {view.myprofile}
                <li>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-sm btn-secondary text-white mt-3 p-1"
                    id="btn-logout"
                    title="logout"
                    htmlFor="modal-logout"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* logo */}
          <div className="w-24 md:w-40">
            <Link href={view.link_logo}>
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
              {view.myproduct}
              <li>
                <Link href={view.inventory.link}>
                  <a id="to-inventory">{view.inventory.title}</a>
                </Link>
              </li>
              <li>
                <Link href={view.cart.link}>
                  <a id="to-cart">{view.cart.title}</a>
                </Link>
              </li>
              <li>
                <Link href={view.history}>
                  <a id="to-history-order">History Order</a>
                </Link>
              </li>
              {view.outbound}
            </ul>
          </div>
          {/* <div className="mx-2">
            <input type="checkbox" className="toggle" />
          </div> */}
          <div className="dropdown dropdown-end mx-2 hidden lg:block">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <IoPersonCircle size={40} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 font-Roboto font-medium"
            >
              {view.myprofile}
              <li>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-sm btn-secondary text-white mt-2 p-1"
                  id="btn-logout"
                  title="logout"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* modal */}
      <input type="checkbox" className="modal-toggle" checked={showModal} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">
            Logout
          </h3>
          <p className="text-black font-Roboto font-medium">
            Are you sure you want to logout ?
          </p>
          <div className="modal-action font-Roboto">
            <button
              id="btn-yes"
              onClick={(e) => {
                handlelogout();
              }}
              className="btn btn-primary btn-sm w-20 text-white"
            >
              Yes
            </button>
            <button
              id="btn-no"
              onClick={() => {
                setShowModal(false);
              }}
              className="btn btn-secondary btn-sm w-20 text-white"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
