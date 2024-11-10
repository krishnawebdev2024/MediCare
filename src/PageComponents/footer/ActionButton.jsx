import React from "react";

const ActionButton = ({ href, label }) => {
  return (
    <div>
      <button
        onClick={() => window.location.assign(href)}
        className="p-4 rounded-full border-[1px] border-slate-400 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
        <span className="relative z-10 font-medium text-slate-200 group-hover:text-white">
          {label}
        </span>
      </button>
    </div>
  );
};

export default ActionButton;
