import { CycleContext } from "../contexts/CyclesContext";
import { useContext } from "react";

export function useCycle() {
  const context = useContext(CycleContext)

  if(!context) {
    throw new Error('Context Error: Check Cycles Provider.')
  }

  return context
}