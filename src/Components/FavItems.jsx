import React from "react";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function FavItems() {
  // Grab the new removal action directly out of your global context hook
  const { cartItems, starredList, toggleStar, removeCartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-8">
        {/* STARRED FAVORITES SECTION */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            ⭐ Favourite Recipes ({starredList.length})
          </h2>
          {starredList.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No Favourite items yet.
            </p>
          ) : (
            <div className="space-y-2">
              {starredList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-xl bg-white shadow-sm"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <h3
                        className="font-semibold text-sm text-slate-800 cursor-pointer"
                        onClick={() => navigate(`/recipe/${item.id}`)}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-xs text-gray-500 cursor-pointer"
                        onClick={() => navigate(`/recipe/${item.id}`)}
                      >
                        {item.category} • {item.area}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStar(item)}
                    className="text-rose-500 hover:text-rose-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-rose-50 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SHOPPING CART SECTION */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            🛒 Recipe Box ({cartItems.length})
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Your box is empty.</p>
          ) : (
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-xl bg-white shadow-sm"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <h3
                        onClick={() => navigate(`/recipe/${item.id}`)}
                        className="font-semibold text-sm text-slate-800 cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <p
                        onClick={() => navigate(`/recipe/${item.id}`)}
                        className="text-xs text-gray-500 cursor-pointer"
                      >
                        {item.category} • {item.area}
                      </p>
                    </div>
                  </div>
                  {/* Remove item trigger button */}
                  <button
                    onClick={() => removeCartItems(item)}
                    className="text-rose-500 hover:text-rose-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-rose-50 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavItems;
