import { createContext, ReactNode, useReducer, useState } from "react";
import { cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, CyclesActionTypes, interruptCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'

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

export const CycleContext = createContext({} as CycleContextData);

export function CycleContextProvider({ children }: CycleContextProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { activeCycleId } = cycleState;

  const activeCycle = cycleState.cycles.find(
    (cycle) => cycle.id === activeCycleId
  );

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setSecondsPassed(0);
  };

  const interruptCycle = () => {
    dispatch(interruptCycleAction());
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
