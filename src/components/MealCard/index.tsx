import { MealProps } from "@/redux/features/mealSlice";
import { FaCarrot, FaTrash } from "react-icons/fa";
import styled from "styled-components";

export default function MealCard({
  meal,
  deleteMeal,
  onShowIngredientsClick,
}: {
  meal: MealProps;
  deleteMeal: () => void;
  onShowIngredientsClick: () => void;
}) {
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
      <MealCreatedAt>
        Criado em: {new Date(meal.createdAt).toLocaleDateString()}
      </MealCreatedAt>
      <MealInformationContainer>
        <MacroData>
          <MacroName>Proteínas:</MacroName>
          <MacroQuantity>{totalProteins.toFixed(2)}g</MacroQuantity>
        </MacroData>
        <MacroData>
          <MacroName>Carboidratos:</MacroName>
          <MacroQuantity>{totalCarbs.toFixed(2)}g</MacroQuantity>
        </MacroData>
        <MacroData>
          <MacroName>Gorduras:</MacroName>
          <MacroQuantity>{totalFats.toFixed(2)}g</MacroQuantity>
        </MacroData>
        <MacroData>
          <MacroName>Calorias:</MacroName>
          <MacroQuantity>{totalCalories.toFixed(2)}kcal</MacroQuantity>
        </MacroData>
      </MealInformationContainer>
      <ShowIngredientsButton onClick={onShowIngredientsClick}>
        <FaCarrot /> Ver Ingredientes
      </ShowIngredientsButton>
      <DeleteMealButton onClick={deleteMeal}>
        <FaTrash /> Deletar Refeição
      </DeleteMealButton>
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
  font-size: 22px;
  font-style: italic;
`;

const MealCreatedAt = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 12px;
`;

const MealInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MacroData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin: 5px;
`;

const MacroName = styled.span`
  font-weight: 600;
`;

const MacroQuantity = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const ShowIngredientsButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.primary};
  }
`;

const DeleteMealButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.error};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error};
    box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.white};
  }
`;
