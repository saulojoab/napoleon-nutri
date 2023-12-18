// mealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  proteins: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface IngredientAndQuantity {
  ingredient: Ingredient;
  quantity: number;
}

export interface MealProps {
  name: string;
  ingredients: IngredientAndQuantity[];
}

interface MealsState {
  meals: MealProps[];
}

const initialState: MealsState = {
  meals: [],
};

const mealsSlice = createSlice({
  name: "meals",
  initialState: initialState,
  reducers: {
    addMeal: (state, action) => {
      return { meals: [...state.meals, action.payload] };
    },
    removeMeal: (state, action) => {
      return {
        meals: state.meals.filter((meal) => meal.name !== action.payload),
      };
    },
  },
});

export const { addMeal, removeMeal } = mealsSlice.actions;
export default mealsSlice.reducer;
