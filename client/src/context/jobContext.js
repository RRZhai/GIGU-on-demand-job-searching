import { useReducer, createContext } from "react";

const JobContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
      case "fetch":
          return action.payload
      case "remove":
          return initialState
      default:
          return state;
  }
}

const JobProvider = ({ children }) => {
  const [jobs, dispatch] = useReducer(reducer, initialState);

  return (
    <JobContext.Provider value={{ jobs, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };
