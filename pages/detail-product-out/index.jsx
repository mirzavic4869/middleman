import React from "react";
import Navbar from "../../components/Navbar";

function DetailProductOut() {
  return (
    <>
      <Navbar />
      <div className="m-4">
        <div title="Title">
          <h1 className="text-black font-Roboto font-semibold text-4xl">Detail Product Out</h1>
        </div>
        <div className="overflow-x-auto my-4">
          <table className="table w-full font-Poppins text-black">
            <thead>
              <tr>
                <th className="bg-[#EEEEEE]">ID</th>
                <th className="bg-[#EEEEEE]">Product Name</th>
                <th className="bg-[#EEEEEE]">Unit</th>
                <th className="bg-[#EEEEEE]">QTY</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td>1</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Minyak Goreng</td>
                <td>Liter</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DetailProductOut;
