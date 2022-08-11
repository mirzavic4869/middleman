import React from "react";
import CardHistoryProductOut from "../../components/CardHistoryProductOut";
import Navbar from "../../components/Navbar";

function HistoryProductOut() {
  return (
    <>
      <Navbar />
      <div className="m-4">
        <div title="Title">
          <h1 className="text-black font-Roboto font-semibold text-4xl">History Product Out</h1>
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 my-4">
          <CardHistoryProductOut />
          <CardHistoryProductOut />
          <CardHistoryProductOut />
        </div>
      </div>
    </>
  );
}

export default HistoryProductOut;
