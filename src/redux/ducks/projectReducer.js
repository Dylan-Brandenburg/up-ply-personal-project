import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  teams: [],
  userProjects: [],
  teamProjects: [],
  projectTasks: [],
  userProj: [],
  userTeam: [],
  currentTeamid: 0,
  newProj: {
    project_name: "test",
    project_desc: "test",
    team_id: 0
  }
};

const GET_USERPROJECTS = "GET_USERPROJECTS";
const GET_TEAMPROJECTS = "GET_TEAMPROJECTS";
const GET_PROJECTTASKS = "GET_PROJECTTASKS";
const USER_JOINPROJECTS = "USER_JOINPROJECTS";
const USER_JOINTEAM = "USER_JOINTEAM";
const CREATE_PROJECT = "CREATE_PROJECT";
const GET_CURRENTTEAMID = "GET_CURRENTTEAMID";

export const getUserProjects = () => {
  return {
    type: GET_USERPROJECTS,
    payload: axios.get("/api/getUserProjects")
  };
};
export const getTeamProjects = id => {
  return {
    type: GET_TEAMPROJECTS,
    payload: axios.get(`/api/getteamprojects/${id}`)
  };
};
export const getProjectTasks = id => {
  return {
    type: GET_PROJECTTASKS,
    payload: axios.get(`/api/getProjTasks/${id}`)
  };
};
export const userJoinProject = id => {
  return {
    type: USER_JOINPROJECTS,
    payload: axios.post(`/api/userJoinProject/${id}`)
  };
};
export const userJoinTeam = id => {
  return {
    type: USER_JOINTEAM,
    payload: axios.post(`/api/userJoinTeam/${id}`)
  };
};

export const createNewProject = obj => {
  return {
    type: CREATE_PROJECT,
    payload: axios.post("/api/createProject", obj)
  };
};
export const getCurrentTeamid = currentTeamid => {
  return {
    type: GET_CURRENTTEAMID,
    payload: currentTeamid
  };
};

export default function projectReducer(state = initialState, action) {
  const { type } = action;
  console.log({ state, type });
  switch (action.type) {
    // Projects from user on session
    case "GET_USERPROJECTS_PENDING":
      return { ...state, loading: true };
    case "GET_USERPROJECTS_FULFILLED":
      return { ...state, loading: false, userProjects: action.payload.data };
    case "GET_USERPROJECTS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };
    //getAllProjects where the team id
    case "GET_TEAMPROJECTS_PENDING":
      return { ...state, loading: true };
    case "GET_TEAMPROJECTS_FULFILLED":
      return { ...state, loading: false, teamProjects: action.payload.data };
    case "GET_TEAMPROJECTS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };
    //getAll Tasks where the proj id
    case "GET_PROJECTTASKS_PENDING":
      return { ...state, loading: true };
    case "GET_PROJECTTASKS_FULFILLED":
      return { ...state, loading: false, projectTasks: action.payload.data };
    case "GET_PROJECTTASKS_REJECTED":
      return { ...state, loading: false, error: action.payload.data };
    //userJoinProject
    case "GET_USER_JOINPROJECT_PENDING":
      return { ...state, loading: true };
    case "GET_USER_JOINPROJECT_FULFILLED":
      return { ...state, loading: false, userProj: action.payload.data };
    case "GET_USER_JOINPROJECT_REJECTED":
      return { ...state, loading: false, error: action.payload.data };
    //userJoinTeam
    case "GET_USER_JOINTEAM_PENDING":
      return { ...state, loading: true };
    case "GET_USER_JOINTEAM_FULFILLED":
      return { ...state, loading: false, userTeam: action.payload.data };
    case "GET_USER_JOINTEAM_REJECTED":
      return { ...state, loading: false, error: action.payload.data };
    // Create new project
    case "CREATE_PROJECT_PENDING":
      return { ...state, loading: true };
    case "CREATE_PROJECT_FULFILLED":
      return { ...state, loading: false, newProj: action.payload.data };
    case "CREATE_PROJECT_REJECTED":
      return { ...state, loading: false, error: action.payload.data };

    //GETCURRENTTEAMID
    case "GET_CURRENTTEAMID":
      return { ...state, loading: false, currentTeamid: action.payload };

    default:
      return state;
  }
}
