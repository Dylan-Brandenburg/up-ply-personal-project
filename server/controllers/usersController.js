module.exports = {
  getUsers(req, res, next) {
    const db = req.app.get("db");
    db.get_users()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(500).send({ errorMessags: "oops" }));
  },
  getCurrentUser(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.get_user([id])
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).send({ errorMessage: "oops" }));
  },
  createTeam(req, res, next) {
    const db = req.app.get("db");
    const { newTeamName } = req.body;
    db.create_team([newTeamName])
      .then(team => res.status(200).send(team))
      .catch(err => {
        res.status(500).send({ errorMessage: " OOOOOPSIES!" });
      });
  },
  getTeams(req, res, next) {
    const db = req.app.get("db");
    db.get_teams()
      .then(teams => res.status(200).send(teams))
      .catch(err => res.status(500).send({ errorMessags: "oops" }));
  },
  deleteTeam(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.params;
    db.delete_team([id])
      .then(team => res.status(200).send(team))
      .catch(err => {
        res.status(500).send({ errorMessage: "Didnt delete team" });
      });
  },
  getUserProjects(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.get_user_projects([id])
      .then(userProjects => res.status(200).send(userProjects))
      .catch(err => res.status(500).send({ errorMessage: "NO USER PROJECTS" }));
  },
  updateUser(req, res) {
    const db = req.app.get("db");
    let { first_name, last_name, email, role } = req.body;
    const { id } = req.session.user;
    db.users
      .update({ id }, { first_name, last_name, email, role })
      .then(user => res.status(200).send(user));
  },
  getTasks(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    db.get_tasks([id])
      .then(tasks => res.status(200).send(tasks))
      .catch(err => {
        res.status(500).send({ errorMessage: "Couldnt get tasks" });
      });
  },
  getRecentTasks(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    db.get_recent_tasks([id])
      .then(recentTasks => res.status(200).send(recentTasks))
      .catch(err => {
        res.status(500).send({ errormessage: " Couldnt get recent tasks" });
      });
  }
};
