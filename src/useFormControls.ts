import { FormAction, FormState } from './form';
import { formControlProps } from './formControlProps';

type FormActionDispatch = (action: FormAction<any, any>) => void;

export const useFormControls = <TValues, TAction>(
  state: FormState<TValues>,
  dispatch: (action: TAction) => void
) => {
  return (fieldName: keyof FormState<TValues>) =>
    ({
      props: formControlProps(fieldName.toString(), state, (dispatch as any) as FormActionDispatch),
      isInvalid: state[fieldName].errors && Object.keys(state[fieldName].errors).length > 0,
    })
};
