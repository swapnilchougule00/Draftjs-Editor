import React from "react";

const SaveButton = ({ handleSave }) => {
  return (
    <button
      type="button"
      className=" py-0 px-2 md:px-5 text-lg font-medium tracking-wide border-2 border-black rounded-md border-b-4 border-r-4 active:border-b-2 active:border-r-2  font-mono active:translate-x-[2px] active:translate-y-[2px] transition-all transition-0.2s   "
      onClick={handleSave}
    >
      Save
    </button>
  );
};

export default SaveButton;