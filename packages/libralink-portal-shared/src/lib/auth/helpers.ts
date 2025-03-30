import Cookies from "js-cookie";

export const getInternalStorageTokens = (): {
  isAuthenticated: boolean;
} => {
  const token = Cookies.get("libra-token");
  const authenticated = token !== undefined && token.length !== 0;
  return {
    isAuthenticated: authenticated,
  };
};

export const defaultStateReducer = (state: any, action: { type: any }) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
