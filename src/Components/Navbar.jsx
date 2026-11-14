import { Calendar, Info, ShoppingCart, Utensils } from "lucide-react";
import React from "react";
import NavbarInner from "./NavbarInner";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-0 z-50  bg-white/80 backdrop-blur-md 
        border-b border-slate-200
      `}
    >
      {/* Changed max-w-8xl px-4 -> max-w-7xl px-6 to match <main> */}
      <nav className="max-w-7xl px-6 mx-auto h-16 flex items-center justify-between">
        {/* Brand Logo & Name (Aligns with left edge of Recipe Bank) */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Utensils className="h-6 w-6 text-emerald-600 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Foodie<span className="text-emerald-600">.</span>
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <NavbarInner icon={Calendar} content="Meal Planner" />
          <NavbarInner path="/about" icon={Info} content="About" />
          <NavbarInner
            path="/cart"
            icon={ShoppingCart}
            content="Shopping Cart"
          />
        </div>

        {/* Sign In (Aligns with right edge of Weekly Schedule) */}
        <div className="flex">
          <NavbarInner icon="" content="Sign in With Google" />
          <NavbarInner icon="" content="waw" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
