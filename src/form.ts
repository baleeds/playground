export type FormAction<TValues, TFieldName extends keyof TValues> =
  | { type: 'Field:Change'; fieldName: TFieldName; value: TValues[TFieldName] }
  | { type: 'Field:Blur'; fieldName: string }
  | { type: 'Field:Focus'; fieldName: string };

export type FormError = string;

export type FormControl<TControlValue> = {
  value: TControlValue;
  errors: Record<string, FormError>;
  touched: boolean;
};

export type FormState<TValues> = {
  [TKey in keyof TValues]: FormControl<TValues[TKey]>;
};

export const initialFormState = <TValues extends { [key: string]: any }>(
  initialValues: TValues
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
    {}
  ) as FormState<TValues>;
};

export const reduceFormState = <TState>(
  state: TState,
  untypedAction: any
): TState | undefined => {
  const action = untypedAction as FormAction<any, any>;

  switch (action.type) {
    case 'Field:Change': {
      return {
        ...state,
        [action.fieldName]: {
          value: action.value,
          touched: true,
          errors: {},
        },
      };
    }
  }
};
