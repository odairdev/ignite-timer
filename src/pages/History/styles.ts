import styled from "styled-components";

export const HistoryContainer = styled.div`
  flex: 1;
  color: ${(props) => props.theme["gray-100"]};
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
  }
`;

export const HistoryList = styled.div`
  flex: 1; //Max height possible
  overflow: auto; //Reason for div wrapping a table, to be able to scroll sideways
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; //Element share the same border.
    min-width: 600px; //This will make a scroll appear.

    th {
      background-color: ${(props) => props.theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500",
} as const; // Typescript needs this because otherwise the type for each property will be string (any string), but it need to be the value typed there.

interface StatusColor {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusColor>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};

    ${(props) => props.statusColor}
  }
`;
