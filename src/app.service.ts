import * as Yup from 'yup';
import { createService } from './createService';

// const validationSchema = Yup.object({
//   email: Yup.string().email().required(),
//   password: Yup.string().required().min(2),
// });

type AppServiceAction =
  | { type: 'FieldValueChange'; fieldName: string; value: any }
  | { type: 'Submit' }
  | { type: 'Success' };

export interface AppServiceState {
  email: string;
  password: string;
  isLoading: boolean;
  success: boolean;
  error: string;
}

export const appService = () =>
  createService<AppServiceState, AppServiceAction>({
    initialState: {
      email: '',
      password: '',
      error: '',
      success: false,
      isLoading: false,
    },
    reducer: (state: AppServiceState, action: AppServiceAction) => {
      switch (action.type) {
        case 'FieldValueChange':
          return {
            ...state,
            [action.fieldName]: action.value,
          };
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
