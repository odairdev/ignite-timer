import { createContext, ReactNode, useReducer, useState } from "react";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  amountSecondsPassed: number;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

interface CycleContextProps {
  children: ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case "ADD_NEW_CYCLE":
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case 'INTERRUPT_CYCLE':
      return {...state, cycles: state.cycles.map(cycle => {
        if(cycle.id === state.activeCycleId) {
          return {...cycle, interruptDate: new Date()}
        } else {
          return cycle
        }
      }) , activeCycleId: null}
    case 'CYCLE_FINISHED':
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activeCycleId) {
            return {...cycle, finishedDate: new Date()}
          } else {
            return cycle
          }
        })
      }
    default:
      return state;
  }
};

export const CycleContext = createContext({} as CycleContextData);

export function CycleContextProvider({ children }: CycleContextProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { cycles, activeCycleId } = cycleState;

  const activeCycle = cycleState.cycles.find(
    (cycle) => cycle.id === activeCycleId
  );

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispatch({ type: "CYCLE_FINISHED"});
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({ type: "ADD_NEW_CYCLE", payload: { newCycle } });

    setSecondsPassed(0);
  };

  const interruptCycle = () => {
    dispatch({ type: "INTERRUPT_CYCLE"});
  };

  return (
    <CycleContext.Provider
      value={{
        ...cycleState,
        activeCycle,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
