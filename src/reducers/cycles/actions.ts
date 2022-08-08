import { Cycle } from "./../../contexts/CyclesContext";

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
  CYCLE_FINISHED = "CYCLE_FINISHED",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  };
}

export function interruptCycleAction() {
  return {
    type: CyclesActionTypes.INTERRUPT_CYCLE,
  };
}

export function markCurrentCycleAsFinishedAction() {
  return { type: CyclesActionTypes.CYCLE_FINISHED };
}
