import { useReducer, createContext, useContext } from "react";

const StateContext = createContext(null);
const initialState = { isLoading: false };

const globalStateReducer = (state: any, action: { type: any }) => {
  switch (action.type) {
    case "LOADING":
      return { isLoading: true };

    case "STANDBY":
      return initialState;

    default:
      return state;
  }
};

// @ts-ignore
export const GlobalStateProvider = ({ children }) => {
  return (
    // @ts-ignore
    <StateContext.Provider value={useReducer(globalStateReducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext<any>(StateContext);
};
