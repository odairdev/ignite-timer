import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, CyclesActionTypes, interruptCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { differenceInSeconds } from "date-fns/esm";

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
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storagedCyclesJSON = localStorage.getItem('@ignite-time:cycles-state-1.0.0')

    if(storagedCyclesJSON) {
      return JSON.parse(storagedCyclesJSON)
    } else {
      return {
        cycles: [],
        activeCycleId: null,
      }
    }
  });

  const activeCycle = cycleState.cycles.find(
    (cycle) => cycle.id === activeCycleId
  );
  
  const { activeCycleId } = cycleState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  });


  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cycleState)

    localStorage.setItem('@ignite-time:cycles-state-1.0.0', cyclesStateJSON)
  }, [cycleState])


  

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
