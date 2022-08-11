import React from "react";

export default function InputCustom(props) {
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        class="input input-bordered input-primary text-black input-sm font-Roboto rounded-[20px] w-full my-1 shadow-md shadow-black/40 md:input-md"
      />
    </div>
  );
}
