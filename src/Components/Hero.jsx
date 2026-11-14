import { ArrowRight, Check, Sparkles } from "lucide-react";
import React from "react";
import heroMealImg from "../assets/Images/hero-meal.png";

function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="bg-[#F5F7EF] ">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold mb-5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Weekly Meal Planning</span>
          </div>
          <div>
            <p className="text-4xl sm:text-[52px] leading-[1.15] tracking-tight font-bold text-slate-900">
              Turn saved recipes into a{" "}
              <span className="relative inline-block text-emerald-600 z-10">
                weekly plan
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-emerald-300 -z-10"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9.5C55 3.5 145 3.5 198 9.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              in seconds.
            </p>
          </div>
          <div className="text-slate-600 mt-4 max-w-xl leading-relaxed">
            Browse thousands of free recipes, drag them into your weekly
            calendar, and get an instant grocery list—no paywalls or
            subscriptions.
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("arrow-locate")}
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-bold tracking-[0.5px] text-emerald-50 transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              Start Planning Now
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-200 px-6 py-3.5 font-bold tracking-[0.5px] text-slate-600 transition hover:bg-slate-100 active:scale-[0.98]"
            >
              Browse Free Recipes
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroMealImg}
            alt="Healthy meal prep bowls with fresh vegetables and grains"
            className="h-[420px] w-full rounded-3xl object-cover shadow-xl"
          />

          <div className="bg-slate-100 px-4 py-4 absolute bottom-5 left-5 rounded-2xl">
            <div className="flex gap-4 ">
              <div className="flex  h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-5 w-5 " />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  1 Click Meal-Planner
                </p>
                <p className="text-xs text-slate-500">
                  Find your favourite recipes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
