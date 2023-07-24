import { useReducer, createContext } from "react";

const JobContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return action.payload;
    case "add":
      return [action.payload, ...state];
    case "patch":
      return state.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
    case "remove":
      return state.filter((job) => job.id !== action.payload.id);
    default:
      return state;
  }
};

const JobProvider = ({ children }) => {
  const [jobs, dispatch] = useReducer(reducer, initialState);

  return (
    <JobContext.Provider value={{ jobs, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };
