import styled from "styled-components";

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 7rem);
  margin: 5rem auto;
  background-color: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
`;
