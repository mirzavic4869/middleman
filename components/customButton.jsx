import React from "react";

const AddButton = (props) => {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className="btn btn-sm btn-primary w-full text-white font-Roboto mt-2 rounded-[20px] md:h-10 "
    >
      {props.title}
    </button>
  );
};

const AddButton2 = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="btn btn-sm btn-outline w-full text-primary shadow-lg font-Roboto mt-2 rounded-[20px] md:h-10"
    >
      {props.title}
    </button>
  );
};

const DeleteButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="btn btn-sm w-full btn-error text-white font-Roboto mt-2 rounded-[20px] md:h-10"
    >
      {props.title}
    </button>
  );
};
export { AddButton2, AddButton, DeleteButton };
