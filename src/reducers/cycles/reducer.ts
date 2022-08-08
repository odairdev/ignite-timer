import { Cycle } from '../../contexts/CyclesContext';
import { CyclesActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case CyclesActionTypes.INTERRUPT_CYCLE:
      return {...state, cycles: state.cycles.map(cycle => {
        if(cycle.id === state.activeCycleId) {
          return {...cycle, interruptDate: new Date()}
        } else {
          return cycle
        }
      }) , activeCycleId: null}
    case CyclesActionTypes.CYCLE_FINISHED:
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