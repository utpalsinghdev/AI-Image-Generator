import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
const Card = (props) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={props.photo}
        alt={props.prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto">{props.prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {props.name[0].toUpperCase()}
            </div>
            <p className="text-white text-xs">{props.name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(props.id, props.photo)}
            className="outline-none bg-transparent border border-none"
          >
            <img
            className="w-5 h-5 object-contain invert"
            src={download} alt="download" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
