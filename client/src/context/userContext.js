import { useEffect, useReducer, createContext } from "react";

const UserContext = createContext();

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return action.payload;
    case "remove":
      return initialState;
    case "add":
      return [action.payload, ...state];
    case "patch":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
