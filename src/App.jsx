import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Recipes from "./Components/Recipes";
import Navbar from "./Components/Navbar";
import { CartProvider } from "./Components/CartContext";
import Hero from "./Components/Hero";
import Benefits from "./Components/Benefits";

const INITIAL_SCHEDULE = {
  Monday: { Lunch: null, Dinner: null },
  Tuesday: { Lunch: null, Dinner: null },
  Wednesday: { Lunch: null, Dinner: null },
  Thursday: { Lunch: null, Dinner: null },
  Friday: { Lunch: null, Dinner: null },
  Saturday: { Lunch: null, Dinner: null },
  Sunday: { Lunch: null, Dinner: null },
};

export default function App() {
  const [recipe, setRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Chicken");
  const [isLoading, setIsloading] = useState(false);

  // Load schedule from localStorage or fallback to INITIAL_SCHEDULE
  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem("weekly_meal_schedule");
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
    } catch (e) {
      console.error("Failed to load schedule from localStorage", e);
      return INITIAL_SCHEDULE;
    }
  });

  // Save schedule to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("weekly_meal_schedule", JSON.stringify(schedule));
    } catch (e) {
      console.error("Failed to save schedule to localStorage", e);
    }
  }, [schedule]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setRecipe([]);
      return;
    }
    const controller = new AbortController();
    const { signal } = controller;
    const fetchMeals = async () => {
      setIsloading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`,
          { signal },
        );
        if (!response.ok) throw new Error("Network response error");
        const data = await response.json();
        if (data.meals) {
          const formattedRecipes = data.meals.map((meal) => {
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              const name = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];
              if (name && name.trim()) {
                ingredients.push({ name, amount: measure, unit: "" });
              }
            }
            return {
              id: meal.idMeal,
              name: meal.strMeal,
              image: meal.strMealThumb,
              vegetarian: meal.strCategory === "Vegetarian",
              ingredients: ingredients,
            };
          });
          setRecipe(formattedRecipes);
        } else {
          setRecipe([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching recipes", error);
        }
      } finally {
        setIsloading(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchMeals();
    }, 400);
    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchQuery]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === "recipe-bank-pool") return;
    const [day, meal] = destination.droppableId.split("-");
    const draggedMeal = recipe.find((r) => r.id === draggableId);
    if (draggedMeal && day && meal) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [day]: {
          ...prevSchedule[day],
          [meal]: {
            id: draggedMeal.id,
            name: draggedMeal.name,
          },
        },
      }));
    }
  };

  const clearMealSlot = (day, meal, e) => {
    e.stopPropagation();
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [meal]: null,
      },
    }));
  };

  const navigate = useNavigate();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen text-slate-800 font-sans">
        <Navbar />
        <Hero />
        <Benefits />
        <main
          id="arrow-locate"
          className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Recipe Discovery Bank Container */}
          <section className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[calc(100vh-120px)] top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Recipe Bank
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Drag recipes from here onto your weekly planner.
            </p>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search meals..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <Droppable droppableId="recipe-bank-pool" isDropDisabled={true}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 overflow-y-auto pr-1"
                >
                  <Recipes
                    isLoading={isLoading}
                    recipe={recipe}
                    onSelectRecipe={(selectedItem) => {
                      navigate(`/recipe/${selectedItem.id}`);
                    }}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>

          {/* Right Column: Weekly Schedule Grid */}
          <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Weekly Schedule
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Click a planned recipe anytime to view its directions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(schedule).map((day) => (
                <div
                  key={day}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50/50"
                >
                  <h3 className="font-semibold text-sm text-slate-700 border-b border-slate-100 pb-2 mb-2">
                    {day}
                  </h3>
                  <div className="space-y-2">
                    {["Lunch", "Dinner"].map((meal) => {
                      const mealData = schedule[day][meal];
                      const targetDropId = `${day}-${meal}`;
                      return (
                        <Droppable key={meal} droppableId={targetDropId}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`p-3 rounded-lg border border-dashed text-xs transition min-h-[44px] flex items-center font-medium ${
                                snapshot.isDraggingOver
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                  : mealData
                                    ? "border-emerald-200 bg-emerald-50/40 text-slate-800 font-semibold"
                                    : "border-slate-300 bg-white text-slate-400 hover:bg-slate-100/70"
                              }`}
                            >
                              {mealData ? (
                                <div
                                  onClick={() =>
                                    navigate(`/recipe/${mealData.id}`)
                                  }
                                  className="w-full cursor-pointer hover:text-emerald-600 transition flex items-center justify-between"
                                >
                                  <span className="truncate pr-2">
                                    🍳 {meal}: {mealData.name}
                                  </span>
                                  <button
                                    onClick={(e) => clearMealSlot(day, meal, e)}
                                    className="text-slate-400 hover:text-rose-500 p-0.5 rounded-md hover:bg-rose-50 transition"
                                    title="Remove from schedule"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <p className="w-full text-center select-none">
                                  + Drop {meal} Here
                                </p>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </DragDropContext>
  );
}
