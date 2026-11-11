import { Calendar, Info, ShoppingCart, Utensils } from "lucide-react";
import React from "react";
import NavbarInner from "./NavbarInner";
import { useNavigate } from "react-router-dom";

function Navbar({ hideBorder }) {
  const navigate = useNavigate();

  return (
    // FIX: Moved sticky and z-index to the outermost wrapper container
    <div
      className={`sticky top-0 z-50 bg-white  ${hideBorder ? "" : "border-b border-slate-200"}`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
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
        {/* UX Tip: Changed prop key name to lowercase 'icon' for cleaner standard semantics */}
        <div className="flex items-center gap-2 md:gap-4">
          <NavbarInner icon={Calendar} content="Meal Planner" />
          <NavbarInner path="/about" icon={Info} content="About" />
          <NavbarInner
            path="/cart"
            icon={ShoppingCart}
            content="Shopping Cart"
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
