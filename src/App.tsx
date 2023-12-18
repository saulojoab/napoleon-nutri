import "./App.css";
import styled from "styled-components";
import { MealProps, addMeal } from "./redux/features/mealSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { MOCKED_INGREDIENTS } from "./__mocks__/ingredients";
import { useAppDispatch } from "./hooks/redux";

interface FormData {
  name: string;
  ingredients: {
    ingredient: number;
    quantity: number;
  }[];
}

export default function App() {
  //const { meals } = useAppSelector((state) => state.meal);
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

  function calculateMacros() {
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;

    watchAllFields.ingredients.forEach((item) => {
      const selectedIngredient = MOCKED_INGREDIENTS.find(
        (ing) => ing.id == item.ingredient
      );

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
    <Container>
      <Title>Napoleon Nutri</Title>
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
            <MacroValue>{calculateMacros().totalCarbs.toFixed(2)}g</MacroValue>
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
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
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
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 100%;
`;

const DeleteButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  margin-left: 40px;
`;

const AddNewIngredientButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
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
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
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
`;

const MacroValue = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.white};
`;
