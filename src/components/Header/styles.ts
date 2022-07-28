import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > img {
    height: 2.5rem;
    width: 2.5rem;
  }

  & nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.theme["gray-100"]};

    border-top: 3px solid transparent; //Keeps the element in center
    border-bottom: 3px solid transparent; //Prevents element from moving with mouse hover.

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme["green-500"]};
    }

    &.active {
      color: ${(props) => props.theme["green-500"]};
    }
  }
`;
