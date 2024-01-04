import styled from "styled-components";
import { useState } from "react";
import MealCreationForm from "./container/MealCreationForm";
import { useAppSelector } from "./hooks/redux";
import MealCard from "./components/MealCard";

export default function App() {
  const { meals } = useAppSelector((state) => state.meal);

  const [modalIsOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen((val) => !val);
  }

  return (
    <Container>
      <TopBar>
        <Title>Napoleon Nutri</Title>
        <Button onClick={toggleModal}>Criar Refeição</Button>
      </TopBar>
      <ContentContainer>
        <MealCreationForm modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
        <CreatedMealsContainer>
          <MealGridList>
            {meals.map((meal, index) => (
              <MealCard key={index} meal={meal} />
            ))}
          </MealGridList>
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
