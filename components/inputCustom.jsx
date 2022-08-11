import React from "react";

export default function InputCustom(props) {
  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className="input input-bordered input-primary text-black input-sm font-Roboto rounded-[20px] my-1 shadow-md shadow-black/40 w-full md:h-10 md:w-72 lg:w-96 lg:input-md"
      />
    </div>
  );
}
