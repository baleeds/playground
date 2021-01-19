import { FormAction } from './form';

interface FormControlProps {
  name: string;
  id: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLElement & { value: any }>) => void;
  onBlur: () => void;
  onFocus: () => void;
}

export const formControlProps = (
  name: string,
  state: any,
  dispatch: (action: FormAction<any, any>) => void
): FormControlProps => ({
  name,
  id: name,
  value: state[name].value,
  onChange: (e) =>
    dispatch({ type: 'Field:Change', fieldName: name, value: e.target.value }),
  onBlur: () => dispatch({ type: 'Field:Blur', fieldName: name }),
  onFocus: () => dispatch({ type: 'Field:Focus', fieldName: name }),
});
