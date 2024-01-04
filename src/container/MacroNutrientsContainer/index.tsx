import styled from "styled-components";

export interface Macros {
  totalProteins: number;
  totalCarbs: number;
  totalFats: number;
  totalCalories: number;
}

export default function MacroNutrientsContainer({
  macros,
}: {
  macros: Macros;
}) {
  return (
    <Container>
      <Macro>
        <MacroTitle>Proteínas: </MacroTitle>
        <MacroValue>{macros.totalProteins.toFixed(2)}g</MacroValue>
      </Macro>
      <Macro>
        <MacroTitle>Carboidratos: </MacroTitle>
        <MacroValue>{macros.totalCarbs.toFixed(2)}g</MacroValue>
      </Macro>
      <Macro>
        <MacroTitle>Gorduras: </MacroTitle>
        <MacroValue>{macros.totalFats.toFixed(2)}g</MacroValue>
      </Macro>
      <Macro>
        <MacroTitle>Calorias: </MacroTitle>
        <MacroValue>{macros.totalCalories.toFixed(2)}kcal</MacroValue>
      </Macro>
    </Container>
  );
}

const Container = styled.div`
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
