import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import MealListingContainer from "./container/MealListingContainer";
import { MOCKED_INGREDIENTS } from "./__mocks__/ingredients";
import { MealProps } from "./redux/features/mealSlice";

export default function App() {
  const [meal, setMeal] = useState<MealProps>({
    name: "",
    ingredients: [],
  });

  return <Container></Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;
