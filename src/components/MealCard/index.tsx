import { MealProps } from "@/redux/features/mealSlice";
import styled from "styled-components";

export default function MealCard({ meal }: { meal: MealProps }) {
  const totalProteins = meal.ingredients.reduce(
    (acc, ingredientAndQuantity) => {
      return (
        acc +
        ingredientAndQuantity.ingredient.proteins *
          ingredientAndQuantity.quantity
      );
    },
    0
  );

  const totalCarbs = meal.ingredients.reduce((acc, ingredientAndQuantity) => {
    return (
      acc +
      ingredientAndQuantity.ingredient.carbs * ingredientAndQuantity.quantity
    );
  }, 0);

  const totalFats = meal.ingredients.reduce((acc, ingredientAndQuantity) => {
    return (
      acc +
      ingredientAndQuantity.ingredient.fats * ingredientAndQuantity.quantity
    );
  }, 0);

  const totalCalories = meal.ingredients.reduce(
    (acc, ingredientAndQuantity) => {
      return (
        acc +
        ingredientAndQuantity.ingredient.calories *
          ingredientAndQuantity.quantity
      );
    },
    0
  );

  return (
    <Container>
      <MealName>{meal.name}</MealName>
      <MealInformationContainer>
        <IngredientData>
          <IngredientName>Proteínas:</IngredientName>
          <IngredientQuantity>{totalProteins.toFixed(2)}g</IngredientQuantity>
        </IngredientData>
        <IngredientData>
          <IngredientName>Carboidratos:</IngredientName>
          <IngredientQuantity>{totalCarbs.toFixed(2)}g</IngredientQuantity>
        </IngredientData>
        <IngredientData>
          <IngredientName>Gorduras:</IngredientName>
          <IngredientQuantity>{totalFats.toFixed(2)}g</IngredientQuantity>
        </IngredientData>
        <IngredientData>
          <IngredientName>Calorias:</IngredientName>
          <IngredientQuantity>
            {totalCalories.toFixed(2)}kcal
          </IngredientQuantity>
        </IngredientData>
      </MealInformationContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

const MealName = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const MealInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid white;
  padding: 20px;
`;

const IngredientData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin: 5px;
`;

const IngredientName = styled.span`
  font-weight: bold;
`;

const IngredientQuantity = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;
