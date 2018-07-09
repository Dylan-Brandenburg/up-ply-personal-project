import axios from "axios";

const initialState = {
  user: [],
  loading: false,
  error: "",
  teams: [],
  projects: [],
  userProfile: {}
};

const GET_USER = "GET_USER";
const GET_PROJECTS = "GET_PROJECTS";
const GET_TEAMS = "GET_TEAMS";
const DELETE_TEAM = "DELETE_TEAM";
const CREATE_TEAM = "CREATE_TEAM";
const UPDATE_USER = "UPDATE_USER";

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get(`/api/user`)
  };
};
export const updateUser = obj => {
  return {
    type: UPDATE_USER,
    payload: axios.put("/api/updateUser", obj)
  };
};

export const getProjects = () => {
  return {
    type: GET_PROJECTS,
    payload: axios.get("/api/projects")
  };
};

export const getTeams = () => {
  return {
    type: GET_TEAMS,
    payload: axios.get("/api/getteams")
  };
};

export const deleteTeam = id => {
  return {
    type: DELETE_TEAM,
    payload: axios.delete(`/api/deleteteam/${id}`)
  };
};

export const createTeam = newTeamName => {
  return {
    type: CREATE_TEAM,
    payload: axios.post("/api/createTeam", { newTeamName })
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // Get user on session
    case "GET_USER_PENDING":
      return { ...state, loading: true };
    case "GET_USER_FULFILLED":
      return { ...state, loading: false, user: action.payload.data };
    case "GET_USER_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    // Update User
    case "UPDATE_USER_PENDING":
      return { ...state, loading: true };
    case "UPDATE_USER_FULFILLED":
      return {
        ...state,
        userProfile: action.payload.data,
        loading: false
      };
    case "UPDATE_USER_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    // Projects from user on session
    case "GET_PROJECTS_PENDING":
      return { ...state, loading: true };
    case "GET_PROJEXCTS_FULFILLED":
      return { ...state, loading: false, projects: action.payload.data };
    case "GET_PROJECTS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    //CREATE Team
    case "CREATE_TEAM_PENDING":
      return { ...state, loading: true };
    case "CREATE_TEAM_FULFILLED":
      return {
        ...state,
        loading: false,
        teams: [...state.teams, action.payload.data]
      };
    case "CREATE_TEAM_REJECTED":
      return { ...state, loading: false, error: action.payload.data };
    //getTeam
    case "GET_TEAMS_PENDING":
      return { ...state, loading: true };
    case "GET_TEAMS_FULFILLED":
      return { ...state, loading: false, teams: action.payload.data };
    case "GET_TEAMS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    //deleteTeam
    case "DELETE_TEAM_PENDING":
      return { ...state, loading: true };
    case "DELETE_TEAM_FULFILLED":
      return {
        ...state,
        error: null,
        teams: action.payload.data,
        loading: false
      };
    case "DELETE_TEAM_REJECTED":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
