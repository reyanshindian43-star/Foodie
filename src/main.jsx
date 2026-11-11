import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RecipeDetail from "./Components/RecipeDetail.jsx";
import FavItems from "./Components/FavItems";
import { CartProvider } from "./Components/CartContext.jsx";

// 1. Create a layout shell component to hold the context state globally

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/recipe/:id",
    element: <RecipeDetail />,
  },
  {
    path: "/cart",
    element: <FavItems />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      {/* 3. This line remains completely unchanged as requested */}
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);
