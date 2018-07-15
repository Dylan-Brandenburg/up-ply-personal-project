const {
  getEveryone,
  getCurrentUser,
  createTeam,
  getTeams,
  getUserProjects,
  updateUser,
  deleteTeam,
  getTasks,
  getRecentTasks
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
  // Projects
  app.get("/api/getUserProjects", getUserProjects);
  // Tasks
  app.get("/api/getTasks", getTasks);
  app.get("/api/getRecentTasks", getRecentTasks);
};
