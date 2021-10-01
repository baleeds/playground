import { useMemo } from "react";
import { FormControl, FormState } from "./form";

export const useFormSelectors = <TValues>(state: FormState<TValues>) => {
  return useMemo(() => {
    const isInvalid = (Object.values(state) as FormControl<unknown>[])
      .some((field) => field.errors && Object.keys(field.errors).length > 0);
    
    return {
      isInvalid,
    };
  }, [state]);
}
