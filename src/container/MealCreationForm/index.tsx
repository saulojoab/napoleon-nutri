import { MOCKED_INGREDIENTS } from "@/mocks/ingredients";
import { useAppDispatch } from "@/hooks/redux";
import { Ingredient, MealProps, addMeal } from "@/redux/features/mealSlice";
import { Modal } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

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
  const { register, control, handleSubmit, watch } = useForm({
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
    };

    dispatch(addMeal(parsedMeal));
  }

  return (
    <Modal open={modalIsOpen} onClose={toggleModal}>
      <Container>
        <ModalTitleAndCloseButtonContainer>
          <ModalTitle>Criar Refeição</ModalTitle>
          <CloseButton onClick={toggleModal}>X</CloseButton>
        </ModalTitleAndCloseButtonContainer>
        <Form onSubmit={handleSubmit((data) => addMealToList(data))}>
          <TextInputWithLabel>
            <Label htmlFor="name">Nome da Refeição</Label>
            <TextInput {...register("name")} />
          </TextInputWithLabel>
          <br />
          <Label>Lista de Ingredientes</Label>

          {fields.map((item, index) => {
            return (
              <IngredientAndQuantityContainer key={item.id}>
                <Select
                  {...register(`ingredients.${index}.ingredient`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={item.ingredient}
                >
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
                  Apagar
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
            Adicionar Novo Ingrediente
          </AddNewIngredientButton>
          <br />
          <MacroNutrientsContainer>
            <Macro>
              <MacroTitle>Proteínas: </MacroTitle>
              <MacroValue>
                {calculateMacros().totalProteins.toFixed(2)}g
              </MacroValue>
            </Macro>
            <Macro>
              <MacroTitle>Carboidratos: </MacroTitle>
              <MacroValue>
                {calculateMacros().totalCarbs.toFixed(2)}g
              </MacroValue>
            </Macro>
            <Macro>
              <MacroTitle>Gorduras: </MacroTitle>
              <MacroValue>{calculateMacros().totalFats.toFixed(2)}g</MacroValue>
            </Macro>
            <Macro>
              <MacroTitle>Calorias: </MacroTitle>
              <MacroValue>
                {calculateMacros().totalCalories.toFixed(2)}kcal
              </MacroValue>
            </Macro>
          </MacroNutrientsContainer>
          <SubmitButton type="submit">Criar Refeição</SubmitButton>
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
  height: 30px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error};
  }
`;

const AddNewIngredientButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.white};
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
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.success};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success};
  }
`;

const UnitOfMeasurement = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

const MacroNutrientsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Macro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin: 5px;
`;

const MacroTitle = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`;

const MacroValue = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.white};
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
`;

const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 5px;
  padding: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error};
  }
`;
