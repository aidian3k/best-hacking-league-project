export type Authentication = {
  username: string | null;
  isAuthenticated: boolean;
};

export type AuthenticationState = {
  authentication: Authentication;
};

export const initialAuthenticationState: AuthenticationState = {
  authentication: {
    username: null,
    isAuthenticated: false
  }
};
