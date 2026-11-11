import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarInner({ path, icon: Icon, content }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => path && navigate(path)}
      className="flex items-center gap-2 px-3 py-2  rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors"
    >
      {/* If Icon exists, render it safely */}
      {Icon && <Icon className="h-4 w-4" />}
      <span className="hidden sm:inline">{content}</span>
    </button>
  );
}
