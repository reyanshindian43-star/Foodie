import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "./CartContext";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, starredList, toggleStar } = useCart();

  const isStarred = starredList.some((item) => item?.id === meal?.id);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMealDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          { signal },
        );
        if (!response.ok) throw new Error("Failed to load recipe details.");
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          const rawMeal = data.meals[0];
          const ingredientsList = [];
          for (let i = 1; i <= 20; i++) {
            const name = rawMeal[`strIngredient${i}`];
            const measure = rawMeal[`strMeasure${i}`];
            if (name && name.trim()) {
              ingredientsList.push({
                name: name.trim(),
                amount: measure ? measure.trim() : "",
              });
            }
          }

          const instructionsList = rawMeal.strInstructions
            ? rawMeal.strInstructions
                .split(/\r?\n/)
                .filter((step) => step.trim().length > 0)
            : [];

          setMeal({
            id: rawMeal.idMeal,
            name: rawMeal.strMeal,
            image: rawMeal.strMealThumb,
            category: rawMeal.strCategory,
            area: rawMeal.strArea,
            vegetarian: rawMeal.strCategory === "Vegetarian",
            ingredients: ingredientsList,
            instructions: instructionsList,
            video: rawMeal.strYoutube,
          });
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching recipe profile:", err);
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDetail();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium text-sm">
            Assembling recipe details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-rose-500 font-semibold mb-2">Oops!</p>
          <p className="text-slate-600 text-sm mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 transition text-sm"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!meal) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Navigation Action & Header Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-200">
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 z-10 hover:text-emerald-700 bg-white/90 backdrop-blur-sm text-slate-700 p-2.5 rounded-full shadow-md hover:bg-white transition flex items-center justify-center"
            >
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                toggleStar(meal);
              }}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-white transition flex items-center justify-center"
            >
              <svg
                xmlns="http://w3.org"
                fill={isStarred ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`w-5 h-5 transition-colors duration-200 ${
                  isStarred ? "text-amber-500" : "text-slate-700"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499c.151-.312.596-.312.748 0l2.425 4.915 5.405.786c.344.05.48.473.231.717l-3.911 3.812.923 5.383c.059.344-.304.607-.609.445L12 16.919l-4.837 2.541c-.305.163-.668-.1-.609-.445l.923-5.383-3.911-3.812c-.25-.244-.114-.667.23-.717l5.405-.786 2.425-4.916z"
                />
              </svg>
            </button>
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Container */}
          <div className="p-6 sm:p-8">
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${meal.vegetarian ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}
              >
                {meal.vegetarian ? "Veg" : "Non-Veg"}
              </span>
              <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                {meal.category}
              </span>
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                {meal.area} Cuisine
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              {meal.name}
            </h1>

            {/* Interactive Layout Section */}
            <div className="space-y-8">
              {/* Ingredients Component */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-emerald-500 rounded-full"></span>{" "}
                  Ingredients checklist
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {meal.ingredients.map((item, i) => (
                    <label
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">
                          {item.amount}
                        </span>{" "}
                        {item.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preparation Blueprint */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-emerald-500 rounded-full"></span>{" "}
                  Instructions
                </h2>
                {meal.instructions.length > 0 ? (
                  <ol className="space-y-4">
                    {meal.instructions.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-xs"
                      >
                        <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm">
                          {i + 1}
                        </span>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    No structural instruction details provided.
                  </p>
                )}
              </div>

              {/* Supplementary Video Content */}
              {meal.video && (
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={meal.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition p-4 rounded-2xl font-medium text-sm border border-rose-200"
                  >
                    <svg
                      xmlns="http://w3.org"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch Preparation on YouTube
                  </a>
                </div>
              )}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); // Prevents any form or routing layout side-effects
                    addToCart(meal);
                  }}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition duration-200 text-center text-sm shadow-sm active:scale-[0.98]"
                >
                  Add Ingredients to Recipe Box
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
