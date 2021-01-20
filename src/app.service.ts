import * as Yup from 'yup';
import { createService } from './createService';
import { FormAction, formReducer, FormState, initialFormState } from './form';

// const validationSchema = Yup.object({
//   email: Yup.string().email().required(),
//   password: Yup.string().required().min(2),
// });

interface LoginValues {
  email: string;
  password: string;
}

// TODO: Add action reducer pipe chains that will allow us to compose the form action/reducer in a cleaner way.

type AppServiceAction =
  | FormAction<LoginValues, keyof LoginValues>
  | { type: 'FieldValueChange'; fieldName: string; value: any }
  | { type: 'Submit' }
  | { type: 'Success' };

export type AppServiceState = {
  isLoading: boolean;
  success: boolean;
  error: string;
  form: FormState<LoginValues>;
};

export const appService = () =>
  createService<AppServiceState, AppServiceAction>({
    initialState: () => ({
      error: '',
      success: false,
      isLoading: false,
      form: initialFormState<LoginValues>({
        email: '',
        password: '',
      }),
    }),
    reducer: formReducer(
      (s) => s.form,
      (state: AppServiceState, action: AppServiceAction) => {
        switch (action.type) {
          case 'Submit':
            return {
              ...state,
              isLoading: true,
            };
          case 'Success':
            return {
              ...state,
              isLoading: false,
              success: true,
            };
          default:
            return state;
        }
      },
    ),
    effects: (action, dispatch) => {
      console.log(action);

      switch (action.type) {
        case 'Submit': {
          console.log('Submitting');
          setTimeout(() => {
            dispatch({ type: 'Success' });
          }, 1000);
          break;
        }
      }
    },
  });
