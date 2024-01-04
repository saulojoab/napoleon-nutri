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
  createdAt: Date;
}

interface MealsState {
  meals: MealProps[];
  selectedMeal: MealProps | null;
}

const initialState: MealsState = {
  meals: [],
  selectedMeal: null,
};

const mealsSlice = createSlice({
  name: "meals",
  initialState: initialState,
  reducers: {
    addMeal: (state, action) => {
      return {
        meals: [...state.meals, action.payload],
        selectedMeal: state.selectedMeal,
      };
    },
    removeMeal: (state, action) => {
      return {
        meals: state.meals.filter((meal) => meal.name !== action.payload),
        selectedMeal: state.selectedMeal,
      };
    },
    setSelectedMeal: (state, action) => {
      return { meals: state.meals, selectedMeal: action.payload };
    },
    clearSelectedMeal: (state) => {
      return { meals: state.meals, selectedMeal: null };
    },
  },
});

export const { addMeal, removeMeal, clearSelectedMeal, setSelectedMeal } =
  mealsSlice.actions;
export default mealsSlice.reducer;
