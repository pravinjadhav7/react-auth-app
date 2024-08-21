import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  AuthActionTypes,
} from '../actions/types';

export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name?: string } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
