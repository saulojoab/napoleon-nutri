import styled from "styled-components";
import { IngredientAndQuantity } from "../../App";

function MealIngredient({
  ingredientAndQuantity,
}: {
  ingredientAndQuantity: IngredientAndQuantity;
}) {
  const totalProteins =
    ingredientAndQuantity.ingredient.proteins * ingredientAndQuantity.quantity;
  const totalCarbs =
    ingredientAndQuantity.ingredient.carbs * ingredientAndQuantity.quantity;
  const totalFats =
    ingredientAndQuantity.ingredient.fats * ingredientAndQuantity.quantity;
  const totalCalories =
    ingredientAndQuantity.ingredient.calories * ingredientAndQuantity.quantity;

  return (
    <IngredientContainer>
      <IngredientName>{ingredientAndQuantity.ingredient.name}</IngredientName>
      <span>
        {ingredientAndQuantity.quantity} {ingredientAndQuantity.ingredient.unit}
      </span>
      <br />
      <span>Proteína: {totalProteins.toFixed(2)}g</span>
      <span>Carboidrato: {totalCarbs.toFixed(2)}g</span>
      <span>Gordura: {totalFats.toFixed(2)}g</span>
      <span>
        Calorias: {totalCalories.toFixed(2)}
        kcal
      </span>
    </IngredientContainer>
  );
}

export default function MealListingContainer({
  meal,
}: {
  meal: IngredientAndQuantity[];
}) {
  if (!meal.length) return <></>;

  const totalProteins = meal.reduce((acc, ingredientAndQuantity) => {
    return (
      acc +
      ingredientAndQuantity.ingredient.proteins * ingredientAndQuantity.quantity
    );
  }, 0);

  const totalCarbs = meal.reduce((acc, ingredientAndQuantity) => {
    return (
      acc +
      ingredientAndQuantity.ingredient.carbs * ingredientAndQuantity.quantity
    );
  }, 0);

  const totalFats = meal.reduce((acc, ingredientAndQuantity) => {
    return (
      acc +
      ingredientAndQuantity.ingredient.fats * ingredientAndQuantity.quantity
    );
  }, 0);

  const totalCalories = meal.reduce((acc, ingredientAndQuantity) => {
    return (
      acc +
      ingredientAndQuantity.ingredient.calories * ingredientAndQuantity.quantity
    );
  }, 0);

  return (
    <Container>
      {meal.map((ingredientAndQuantity, index) => (
        <MealIngredient
          key={index}
          ingredientAndQuantity={ingredientAndQuantity}
        />
      ))}
      <span>Total de Proteínas: {totalProteins.toFixed(2)}g</span>
      <span>Total de Carboidratos: {totalCarbs.toFixed(2)}g</span>
      <span>Total de Gorduras: {totalFats.toFixed(2)}g</span>
      <span>Total de Calorias: {totalCalories.toFixed(2)}kcal</span>
    </Container>
  );
}

const IngredientName = styled.span`
  font-weight: bold;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid white;
  padding: 20px;
`;
