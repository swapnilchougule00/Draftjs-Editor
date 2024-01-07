import React from "react";
import SaveButton from "./SaveButton";

const Header = ({ handleSave }) => {
  return (
    <div className="flex justify-center w-full  items-center h-[8%] font-relway">
      <h1 className="font-black text-center w-[60%] tracking-wider text-base">Demo Editor By Swapnil Chougule</h1>
      <div className="flex  justify-self-end">
        <SaveButton handleSave={handleSave} />
        
      </div>
    </div>
  );
};

export default Header;