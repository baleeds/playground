import * as Yup from 'yup';
import { createService } from './createService';
import {
  FormAction,
  FormState,
  initialFormState,
  reduceFormState,
} from './form';

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

export type AppServiceState = FormState<LoginValues> & {
  isLoading: boolean;
  success: boolean;
  error: string;
};

export const appService = () =>
  createService<AppServiceState, AppServiceAction>({
    initialState: {
      error: '',
      success: false,
      isLoading: false,
      ...initialFormState<LoginValues>({
        email: '',
        password: '',
      }),
    },
    reducer: (state: AppServiceState, action: AppServiceAction) => {
      const newState = reduceFormState(state, action);
      if (newState) return newState;

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
