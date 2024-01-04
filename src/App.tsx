import styled from "styled-components";
import { useState } from "react";
import MealCreationForm from "./container/MealCreationForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import MealCard from "./components/MealCard";
import { FaDownload } from "react-icons/fa";
import {
  MealProps,
  removeMeal,
  setSelectedMeal,
} from "./redux/features/mealSlice";
import MealIngredientsModal from "./container/MealIngredientsModal";

export default function App() {
  const { meals } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [ingredientsModalIsOpen, setIngredientsModalIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen((val) => !val);
  }

  function toggleIngredientsModal() {
    setIngredientsModalIsOpen((val) => !val);
  }

  function deleteMeal(meal: string) {
    dispatch(removeMeal(meal));
  }

  function onShowIngredientsClick(meal: MealProps) {
    dispatch(setSelectedMeal(meal));
    toggleIngredientsModal();
  }

  return (
    <Container>
      <MealIngredientsModal
        modalIsOpen={ingredientsModalIsOpen}
        toggleModal={toggleIngredientsModal}
      />

      <TopBar>
        <Title>Napoleon Nutri</Title>
        <Button onClick={toggleModal}>Criar Refeição</Button>
      </TopBar>
      <ContentContainer>
        <MealCreationForm modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
        <CreatedMealsContainer>
          {meals.length === 0 && (
            <NoMealsCreatedText>
              Você ainda não criou nenhuma refeição. <br />
              <SmallNoMealsCreatedText>
                Crie usando o botão superior direito.
              </SmallNoMealsCreatedText>
            </NoMealsCreatedText>
          )}
          <MealGridList>
            {meals.map((meal, index) => (
              <MealCard
                deleteMeal={() => deleteMeal(meal.name)}
                key={index}
                meal={meal}
                onShowIngredientsClick={() => onShowIngredientsClick(meal)}
              />
            ))}
          </MealGridList>
          {meals.length > 0 && (
            <ExportButton
              onClick={() => {
                const data = JSON.stringify(meals);
                const blob = new Blob([data], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "meals.json";
                a.click();
              }}
            >
              <FaDownload /> Exportar Refeições
            </ExportButton>
          )}
        </CreatedMealsContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 20px;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 900;
  font-size: 24px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
`;

const Button = styled.button`
  //disable all default styles
  all: unset;
  border-radius: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.success};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success};
  }
`;

const CreatedMealsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MealGridList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const NoMealsCreatedText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
`;

const SmallNoMealsCreatedText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
`;

const ExportButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  align-self: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success};
    animation: none;
  }

  // Light shake animation

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  // loop smoothly forever
  animation: shake 3s infinite ease-in-out;
`;
