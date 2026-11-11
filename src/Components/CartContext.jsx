import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItemsList");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [starredList, setStarredList] = useState(() => {
    const savedStarred = localStorage.getItem("starredItemsList");
    return savedStarred ? JSON.parse(savedStarred) : [];
  });

  // New state for handling the floating animation alert
  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: "success",
  });

  useEffect(() => {
    localStorage.setItem("cartItemsList", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("starredItemsList", JSON.stringify(starredList));
  }, [starredList]);

  // Helper to trigger the floating toast animation
  const showNotification = (message, type = "success") => {
    setToast({ message, visible: true, type });

    // Automatically hide it after 2.5 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const addToCart = (recipe) => {
    setCartItems((prevItems) => {
      const isAlreadyInCart = prevItems.some((item) => item.id === recipe.id);
      if (isAlreadyInCart) {
        showNotification("Item is already in your cart!", "info");
        return prevItems;
      }
      showNotification(`Added "${recipe.name}" to cart!`, "success");
      return [...prevItems, recipe];
    });
  };

  const toggleStar = (recipe) => {
    setStarredList((prevList) => {
      const isAlreadyStarred = prevList.some((item) => item.id === recipe.id);
      if (isAlreadyStarred) {
        showNotification(`Removed "${recipe.name}" from favorites`, "info");
        return prevList.filter((item) => item.id !== recipe.id);
      } else {
        showNotification(`Added "${recipe.name}" to favorites!`, "star");
        return [...prevList, recipe];
      }
    });
  };

  const removeCartItems = (recipe) => {
    setCartItems((prevResult) =>
      prevResult.filter((item) => item.id !== recipe.id),
    );
    showNotification(`Removed "${recipe.name}" from cart`, "info");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeCartItems, starredList, toggleStar }}
    >
      {children}

      {/* FLOATING TOAST COMPONENT */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl border text-sm font-semibold transition-all duration-300 transform ${
          toast.visible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        } ${
          toast.type === "star"
            ? "bg-amber-50 border-amber-200 text-amber-800"
            : toast.type === "info"
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}
      >
        <span>
          {toast.type === "star" ? "⭐" : toast.type === "info" ? "ℹ️" : "🛒"}
        </span>
        {toast.message}
      </div>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
