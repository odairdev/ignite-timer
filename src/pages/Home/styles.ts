import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${(props) => props.theme["gray-100"]};
  cursor: pointer;

  transition: 0.2s;
`

export const StartCountdownButton = styled(BaseButton)`
  background-color: ${(props) => props.theme["green-500"]};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StopCountdownButton = styled(BaseButton)`
background-color: ${(props) => props.theme["red-500"]};

&:not(:disabled):hover {
  background-color: ${(props) => props.theme["red-700"]};
}
`;