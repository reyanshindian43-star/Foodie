import React from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

function Recipes({ isLoading, recipe, onSelectRecipe }) {
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <p className="text-sm text-slate-400 text-center py-4">
          Loading recipes...
        </p>
      ) : recipe.length > 0 ? (
        /* 1. Added a flex container here to handle the vertical layout and spacing */
        <div className="flex flex-col gap-4 pr-1">
          {recipe.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                  className={`flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs cursor-grab transition select-none ${
                    snapshot.isDragging
                      ? "shadow-lg border-emerald-500 bg-emerald-50/20"
                      : "hover:border-slate-300"
                  }`}
                >
                  <img
                    onClick={() => navigate(`/recipe/${item.id}`)}
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div
                    onClick={() => navigate(`/recipe/${item.id}`)}
                    className="cursor-pointer flex-1 group"
                  >
                    <h4 className="text-sm font-semibold text-slate-800 hover:text-emerald-600 ">
                      {item.name}
                    </h4>
                    {item.vegetarian && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                        Veg
                      </span>
                    )}
                    {!item.vegetarian && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-medium">
                        Non - Veg
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 text-center py-4">
          No recipes discovered.
        </p>
      )}
    </>
  );
}

export default Recipes;
