import { Dispatch } from 'redux';
import { jwtDecode } from 'jwt-decode';  // Use named import for jwtDecode
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  AuthActionTypes,
} from './types';
import { SignUpDto } from '../../dtos/SignUpDto';
import { SignInDto } from '../../dtos/SignInDto';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const signUp = (formData: SignUpDto) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await fetch(`${apiBaseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message.join(","));
      }

      const data = await response.json();

      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: {
          email: data.email,
          name: data.name,
        },
      });

      localStorage.setItem('token', data.access_token);
      dispatch(autoLogin(data.access_token) as any);

    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';

      console.error('Sign up error:', errorMessage);
      dispatch({
        type: SIGN_UP_FAILURE,
        error: errorMessage,
      });
    }
  };
};

export const signIn = (formData: SignInDto) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await fetch(`${apiBaseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();

      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: {
          email: data.email,
        },
      });

      localStorage.setItem('token', data.access_token);
      dispatch(autoLogin(data.access_token) as any);

    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';

      console.error('Sign in error:', errorMessage);
      dispatch({
        type: SIGN_IN_FAILURE,
        error: errorMessage,
      });
    }
  };
};

export const autoLogin = (token: string) => {
  return (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken.exp * 1000 > Date.now()) {
        const user = {
          email: decodedToken.email,
          name: decodedToken.name,
        };

        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: user,
        });

      } else {
        dispatch(signOut());
      }
    } catch (error) {
      console.error('Auto login error:', error);
      dispatch(signOut());
    }
  };
};

export const signOut = (): AuthActionTypes => {
  localStorage.removeItem('token');
  return { type: SIGN_OUT };
};
