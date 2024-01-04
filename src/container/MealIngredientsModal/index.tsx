import { useAppSelector } from "@/hooks/redux";
import { Modal } from "@mui/material";
import { FaDrumstickBite, FaTimes, FaWeight } from "react-icons/fa";
import styled from "styled-components";
import MacroNutrientsContainer, { Macros } from "../MacroNutrientsContainer";
import { IngredientAndQuantity } from "@/redux/features/mealSlice";

export default function MealIngredientsModal({
  modalIsOpen,
  toggleModal,
}: {
  modalIsOpen: boolean;
  toggleModal: () => void;
}) {
  const meal = useAppSelector((state) => state.meal.selectedMeal);

  function formatMacrosFromIngredients(ingredient: IngredientAndQuantity) {
    return {
      totalProteins: ingredient.ingredient.proteins * ingredient.quantity,
      totalCarbs: ingredient.ingredient.carbs * ingredient.quantity,
      totalFats: ingredient.ingredient.fats * ingredient.quantity,
      totalCalories: ingredient.ingredient.calories * ingredient.quantity,
    } as Macros;
  }

  return (
    <Modal open={modalIsOpen} onClose={toggleModal}>
      <Container>
        <ModalTitleAndCloseButtonContainer>
          <ModalTitle>{meal?.name}</ModalTitle>
          <CloseButton onClick={toggleModal}>
            <FaTimes size={25} />
          </CloseButton>
        </ModalTitleAndCloseButtonContainer>

        <MealIngredientsContainer>
          <IngredientQuantityLabels>
            <IngredientLabel>
              <FaDrumstickBite /> Ingrediente
            </IngredientLabel>
            <IngredientQuantityLabel>
              <FaWeight />
              Quantidade
            </IngredientQuantityLabel>
          </IngredientQuantityLabels>
          {meal?.ingredients.map((ingredientAndQuantity) => (
            <IngredientAndMacrosContainer>
              <MealIngredient key={ingredientAndQuantity.ingredient.id}>
                <MealIngredientName>
                  {ingredientAndQuantity.ingredient.name}
                </MealIngredientName>
                <MealIngredientQuantity>
                  {ingredientAndQuantity.quantity}{" "}
                  {ingredientAndQuantity.ingredient.unit}
                </MealIngredientQuantity>
              </MealIngredient>
              <MacroNutrientsContainer
                macros={formatMacrosFromIngredients(ingredientAndQuantity)}
              />
            </IngredientAndMacrosContainer>
          ))}
        </MealIngredientsContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 40px;
  padding-top: 20px;
  width: max-content;
  border-radius: 10px;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: scroll;
  max-height: 80%;

  transition: all 0.2s ease-in-out;
`;

const ModalTitleAndCloseButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const ModalTitle = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.error};
  }
`;

const MealIngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const MealIngredient = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 10px;
`;

const MealIngredientName = styled.span`
  font-weight: bold;
`;

const MealIngredientQuantity = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const IngredientQuantityLabels = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
`;

const IngredientLabel = styled.span`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IngredientQuantityLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IngredientAndMacrosContainer = styled.div`
  margin-bottom: 15px;
`;
