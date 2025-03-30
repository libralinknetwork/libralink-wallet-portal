import { useReducer, createContext, useContext, FC, ReactNode } from "react";
import { getInternalStorageTokens, defaultStateReducer } from "./helpers";

const StateContext = createContext(null);

type Props = {
  children: ReactNode;
};

export const SecurityProvider: FC<Props> = ({ children }) => {
  const initialState = getInternalStorageTokens() || {};

  return (
    <StateContext.Provider
      // @ts-ignore
      value={useReducer(defaultStateReducer, initialState)}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useIsAuthenticated = () => {
  return useContext<any>(StateContext);
};
