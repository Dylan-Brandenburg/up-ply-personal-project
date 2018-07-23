import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  tasks: [],
  task: []
};

const GET_TASKS = "GET_TASKS";
const UPDATE_TASK = "UPDATE_TASK";
const CREATE_TASK = "CREATE_TASK";

export const getTasks = () => {
  return {
    type: GET_TASKS,
    payload: axios.get("/api/gettasks")
  };
};
export const updateTask = (taskid, obj) => {
  console.log(obj);
  return {
    type: UPDATE_TASK,
    payload: axios.put(`/api/updatetask/${taskid}`, obj)
  };
};
export const createNewTask = obj => {
  return {
    type: CREATE_TASK,
    payload: axios.post("/api/newtask", obj)
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
    case `${UPDATE_TASK}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_TASK}_FULFILLED`:
      return {
        ...state,
        error: null,
        tasks: action.payload.data,
        loading: false
      };
    case `${UPDATE_TASK}_REJECTED`:
      return { ...state, error: action.payload, loading: false };
    //New Task
    case "CREATE_TASK_PENDING":
      return { ...state, loading: true };
    case "CREATE_TASK_FULFILLED":
      return { ...state, loading: false, task: action.payload.data };
    case "CREATE_TASK_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    default:
      return state;
  }
}
