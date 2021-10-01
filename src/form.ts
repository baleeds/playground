import produce, { Draft } from 'immer';
import { TryStatement } from 'typescript';
import { Reducer } from './createService';

export type FormAction<TValues, TFieldName extends keyof TValues> =
  | { type: 'Field:Change'; fieldName: TFieldName; value: TValues[TFieldName] }
  | { type: 'Field:Blur'; fieldName: string }
  | { type: 'Field:Focus'; fieldName: string }
  | { type: 'Form:Validated'; errors: Record<TFieldName, Record<string, FormError>>};

export type FormError = any;

export type FormControl<TControlValue> = {
  value: TControlValue;
  errors: Record<string, FormError>;
  touched: boolean;
};

export type FormState<TValues> = {
  [TKey in keyof TValues]: FormControl<TValues[TKey]>;
};

type FormStateSelector<TState, TValues = any> = (
  state: TState | Draft<TState>,
) => FormState<TValues>;

export const initialFormState = <TValues extends { [key: string]: any }>(
  initialValues: TValues,
): FormState<TValues> => {
  return Object.keys(initialValues).reduce(
    (state: Record<string, FormControl<any>>, key) => {
      state[key] = {
        value: initialValues[key],
        errors: {},
        touched: false,
      };

      return state;
    },
    {},
  ) as FormState<TValues>;
};

export const reduceFormState = <TState>(
  state: TState,
  stateSelector: FormStateSelector<TState>,
  untypedAction: any,
): TState => {
  const action = untypedAction as FormAction<any, any>;

  switch (action.type) {
    case 'Field:Change': {
      return produce(state, (draft) => {
        const formState = stateSelector(draft);

        formState[action.fieldName] = {
          ...formState[action.fieldName],
          value: action.value,
          touched: true,
        };
      });
    }
    case 'Form:Validated': {
      return produce(state, (draft) => {
        const formState = stateSelector(draft);

        Object.keys(action.errors).forEach((fieldName) => {
          if (!formState[fieldName]) return;

          const fieldErrors = action.errors[fieldName];

          formState[fieldName] = {
            ...formState[fieldName],
            errors: fieldErrors,
          };
        });
      })
    }
    default:
      return state;
  }
};

export const formReducer = <TState, TAction>(
  stateSelector: FormStateSelector<TState>,
) => (state: TState, action: TAction) =>
  reduceFormState(state, stateSelector, action);

export const getFormValues = <TValues>(formState: FormState<TValues>) =>
  Object.keys(formState).reduce((acc, fieldName) => {
    acc[fieldName as keyof TValues] = formState[fieldName as keyof TValues].value;
    return acc;
  }, {} as TValues)

export const formEffects = <TValues>(
  formState: FormState<TValues>,
  action: any, dispatch: any,
  validate: (values: TValues) => Record<string, Record<string, FormError> | null> | null
) => {
  if (action.type === 'Field:Change') {
    setTimeout(() => {
      const errors = validate(getFormValues(formState));
      dispatch({ type: 'Form:Validated', errors });
    })
  }
}