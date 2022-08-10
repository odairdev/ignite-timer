import { useFormContext } from "react-hook-form"
import { useCycle } from "../../../hooks/useCycle"
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles"

export function NewCycleForm() {
  const {activeCycle} = useCycle()
  const { register } = useFormContext()

  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register("task")}
            disabled={!!activeCycle}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
          </datalist>

          <label htmlFor="minutesAmount"> durante </label>
          <MinutesAmountInput
            type="number"
            max={60}
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={0}
            {...register("minutesAmount", {
              valueAsNumber: true,
            })}
            disabled={!!activeCycle}
          />

          <span> minutos.</span>
        </FormContainer>
  )
}