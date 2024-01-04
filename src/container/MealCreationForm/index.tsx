import { MOCKED_INGREDIENTS } from "@/mocks/ingredients";
import { useAppDispatch } from "@/hooks/redux";
import { Ingredient, MealProps, addMeal } from "@/redux/features/mealSlice";
import { Modal } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTimes, FaTrash, FaPen, FaUtensils, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import MacroNutrientsContainer from "../MacroNutrientsContainer";

interface MealCreationFormProps {
  modalIsOpen: boolean;
  toggleModal: () => void;
}

interface FormData {
  name: string;
  ingredients: {
    ingredient: number;
    quantity: number;
  }[];
}

export default function MealCreationForm({
  modalIsOpen,
  toggleModal,
}: MealCreationFormProps) {
  const dispatch = useAppDispatch();
  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: "",
      ingredients: [
        {
          ingredient: -1,
          quantity: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const watchAllFields = watch();

  console.log(watchAllFields);

  const ingredientMap = useMemo(() => {
    const map: { [key: number]: Ingredient } = {};

    MOCKED_INGREDIENTS.forEach((ingredient) => {
      map[ingredient.id] = ingredient;
    });
    return map;
  }, []);

  function calculateMacros() {
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;

    watchAllFields.ingredients.forEach((item) => {
      const selectedIngredient = ingredientMap[item.ingredient];

      if (selectedIngredient) {
        totalProteins += selectedIngredient.proteins * item.quantity; // Se a unidade for 'g'
        totalCarbs += selectedIngredient.carbs * item.quantity;
        totalFats += selectedIngredient.fats * item.quantity;
        totalCalories += selectedIngredient.calories * item.quantity;
      }
    });

    return { totalProteins, totalCarbs, totalFats, totalCalories };
  }

  function addMealToList(meal: FormData) {
    const parsedMeal: MealProps = {
      name: meal.name,
      ingredients: meal.ingredients.map((item) => ({
        ingredient: MOCKED_INGREDIENTS.find(
          (ing) => ing.id == item.ingredient
        )!,
        quantity: item.quantity,
      })),
      createdAt: new Date(),
    };

    dispatch(addMeal(parsedMeal));
    reset();
  }

  const isDisabled = useMemo(() => {
    const hasEmptyIngredient = watchAllFields.ingredients.some(
      (item) => item.ingredient == -1
    );

    const hasEmptyQuantity = watchAllFields.ingredients.some(
      (item) => item.quantity == 0
    );

    const hasEmptyName = watchAllFields.name == "";

    return hasEmptyIngredient || hasEmptyQuantity || hasEmptyName;
  }, [watchAllFields]);

  return (
    <Modal open={modalIsOpen} onClose={toggleModal}>
      <Container>
        <ModalTitleAndCloseButtonContainer>
          <ModalTitle>Criar Refeição</ModalTitle>
          <CloseButton onClick={toggleModal}>
            <FaTimes size={25} />
          </CloseButton>
        </ModalTitleAndCloseButtonContainer>

        <Form onSubmit={handleSubmit((data) => addMealToList(data))}>
          <TextInputWithLabel>
            <Label htmlFor="name">
              <FaPen /> Nome da Refeição
            </Label>
            <TextInput
              placeholder="Ex: Almoço do Pedro"
              {...register("name")}
            />
          </TextInputWithLabel>

          <br />

          <Label>
            <FaUtensils /> Lista de Ingredientes
          </Label>

          {fields.map((item, index) => {
            return (
              <IngredientAndQuantityContainer key={item.id}>
                <Select
                  {...register(`ingredients.${index}.ingredient`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={item.ingredient}
                >
                  <option value={-1} disabled>
                    Selecione um ingrediente
                  </option>
                  {MOCKED_INGREDIENTS.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </Select>

                <TextInput
                  {...register(`ingredients.${index}.quantity`)}
                  type="number"
                  defaultValue={item.quantity}
                />

                <UnitOfMeasurement>
                  {MOCKED_INGREDIENTS.find(
                    (ing) =>
                      ing.id == watchAllFields.ingredients[index]?.ingredient
                  )?.unit == "g"
                    ? "Gramas"
                    : "Unidade"}
                </UnitOfMeasurement>

                <DeleteButton type="button" onClick={() => remove(index)}>
                  <FaTrash size={18} />
                </DeleteButton>
              </IngredientAndQuantityContainer>
            );
          })}
          <AddNewIngredientButton
            type="button"
            onClick={() => {
              append({ ingredient: -1, quantity: 0 });
            }}
          >
            <FaPlus /> Adicionar Novo Ingrediente
          </AddNewIngredientButton>
          <br />
          <br />

          <MacroNutrientsContainer macros={calculateMacros()} />
          <SubmitButton disabled={isDisabled} type="submit">
            Criar Refeição
          </SubmitButton>
        </Form>
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
  max-width: 100%;

  transition: all 0.2s ease-in-out;
`;

const TextInputWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  height: 40px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.veryLightGray};
  }
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  margin-left: 40px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.error};
  }
`;

const AddNewIngredientButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.white};
  }
`;

const IngredientAndQuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.success};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  width: 50%;
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success};
    box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.white};
  }
`;

const UnitOfMeasurement = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.white};
  align-self: flex-start;
  font-weight: 400;
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
