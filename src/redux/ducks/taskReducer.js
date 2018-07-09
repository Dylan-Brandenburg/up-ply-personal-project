import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  tasks: []
};

const GET_TASKS = "GET_TASKS";

export const getTasks = () => {
  return {
    type: GET_TASKS,
    payload: axios.get("/api/gettasks")
  };
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    // Projects from user on session
    case "GET_TASKS_PENDING":
      return { ...state, loading: true };
    case "GET_TASKS_FULFILLED":
      return { ...state, loading: false, tasks: action.payload.data };
    case "GET_TASKS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    default:
      return state;
  }
}
