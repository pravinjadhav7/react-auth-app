export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';

export interface SignUpAction {
  type: typeof SIGN_UP_SUCCESS;
  payload: { email: string; name: string };
}

export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  error: string;
}

export interface SignInAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: { email: string; name?: string };
}

export interface SignInFailureAction {
  type: typeof SIGN_IN_FAILURE;
  error: string;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type AuthActionTypes =
  | SignUpAction
  | SignUpFailureAction
  | SignInAction
  | SignInFailureAction
  | SignOutAction;
