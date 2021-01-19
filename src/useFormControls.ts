import { FormAction } from './form';
import { formControlProps } from './formControlProps';

type FormActionDispatch = (action: FormAction<any, any>) => void;

export const useFormControls = <TState, TAction>(
  state: TState,
  dispatch: (action: TAction) => void
) => {
  return (fieldName: string) =>
    formControlProps(fieldName, state, (dispatch as any) as FormActionDispatch);
};
