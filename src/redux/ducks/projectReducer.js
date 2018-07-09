import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  teams: [],
  userProjects: []
};

const GET_USERPROJECTS = "GET_USERPROJECTS";

export const getUserProjects = () => {
  return {
    type: GET_USERPROJECTS,
    payload: axios.get("/api/getUserProjects")
  };
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    // Projects from user on session
    case "GET_USERPROJECTS_PENDING":
      return { ...state, loading: true };
    case "GET_USERPROJECTS_FULFILLED":
      return { ...state, loading: false, userProjects: action.payload.data };
    case "GET_USERPROJECTS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    default:
      return state;
  }
}
