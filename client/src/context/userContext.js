import { useEffect, useReducer, createContext } from "react";

const UserContext = createContext();

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return action.payload;
    case "remove":
      return initialState;
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

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5555/me");
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "fetch", payload: data.user });
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
