const {
  getEveryone,
  getCurrentUser,
  createTeam,
  getTeams,
  getUserProjects,
  getTeamProjects,
  updateUser,
  deleteTeam,
  getTasks,
  getRecentTasks,
  updateTask,
  createTask,
  getProjTasks,
  createProject,
  userJoinTeam,
  userJoinProject
} = require("./controllers/usersController");

module.exports = app => {
  // Users
  app.get("/api/getEveryone", getEveryone);
  app.get("/api/user", getCurrentUser);
  app.put("/api/updateUser", updateUser);
  // Teams
  app.post("/api/createTeam", createTeam);
  app.get("/api/getTeams", getTeams);
  app.delete("/api/deleteteam/:id", deleteTeam);
  app.post("/api/userJoinTeam/:id", userJoinTeam);
  // Projects
  app.get("/api/getUserProjects", getUserProjects);
  app.get("/api/getTeamProjects/:id", getTeamProjects);
  app.post("/api/createProject", createProject);
  app.post("/api/userJoinProject/:id", userJoinProject);
  // Tasks
  app.get("/api/getTasks", getTasks);
  app.get("/api/getRecentTasks", getRecentTasks);
  app.put("/api/updatetask/:id", updateTask);
  app.post("/api/newtask", createTask);
  app.get("/api/getProjTasks/:id", getProjTasks);
};
