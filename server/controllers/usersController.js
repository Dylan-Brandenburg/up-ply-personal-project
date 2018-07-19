module.exports = {
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
  getTeamProjects(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db.get_team_project([id])
      .then(projects => res.status(200).send(projects))
      .catch(err =>
        res.status(500).send({ errorMessage: "Cant get Team Projects" })
      );
  },
  //USERS
  getCurrentUser(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.get_user([id])
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).send({ errorMessage: "oops" }));
  },
  updateUser(req, res) {
    const db = req.app.get("db");
    let { first_name, last_name, email, role, profile_picture } = req.body;
    const { id } = req.session.user;
    db.users
      .update({ id }, { first_name, last_name, email, role, profile_picture })
      .then(user => res.status(200).send(user));
  },
  getEveryone(req, res, next) {
    const db = req.app.get("db");
    db.get_everyone()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(500).send({ errorMessags: "oops" }));
  },
  //Tasks
  getTasks(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    db.get_tasks([id])
      .then(tasks => res.status(200).send(tasks))
      .catch(err => {
        res.status(500).send({ errorMessage: "Couldnt get tasks" });
      });
  },
  getProjTasks(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.params;
    db.get_proj_tasks([id])
      .then(tasks => res.status(200).send(tasks))
      .catch(err => {
        res.status(500).send({ errorMessage: "Couldnt get tasks" });
      });
  },
  createTask(req, res, next) {
    const db = req.app.get("db");
    const {
      task_name,
      task_desc,
      task_status,
      finished,
      user_id,
      assigned_proj_id,
      due_date
    } = req.body;
    db.new_task([
      task_name,
      task_desc,
      task_status,
      finished,
      user_id,
      assigned_proj_id,
      due_date
    ])
      .then(task => res.status(200).send(task))
      .catch(err => {
        res.status(500).send({ errorMessage: " OOOOOPSIES!" });
      });
  },
  // Working
  updateTask(req, res) {
    const db = req.app.get("db");
    let {
      task_name,
      task_desc,
      task_status,
      finished,
      due_date,
      user_id,
      assigned_proj_id
    } = req.body;
    console.log(req.body);
    let { id } = req.params;
    db.task
      .update(
        { id },
        {
          task_name,
          task_desc,
          finished,
          task_status,
          due_date,
          user_id,
          assigned_proj_id
        }
      )
      .then(task => res.status(200).send(task))
      .catch(err => {
        res.status(500).send({ errormessage: " Couldnt get recent tasks" });
      });
  },

  // working
  getRecentTasks(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    db.get_recent_tasks([id])
      .then(recentTasks => res.status(200).send(recentTasks))
      .catch(err => {
        res.status(500).send({ errormessage: " Couldnt get recent tasks" });
      });
  },
  createProject(req, res, next) {
    const db = req.app.get("db");
    let { project_name, project_desc, team_id } = req.body;
    db.create_project([project_name, project_desc])
      .then(project => {
        console.log(project);
        let { id } = project[0];
        db.create_team_proj([team_id, id])
          .then(teamProj =>
            res.status(200).send({ teamProj, project: project[0] })
          )
          .catch(err => {
            res.status(500).send({ errormessage: "wut" });
          });
      })
      .catch(err => {
        res.status(500).send({ errormessage: " Couldnt get recent tasks" });
      });
  },
  userJoinTeam(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    let { team_id } = req.body;
    db.user_join_team([req.params.id, id])
      .then(team => res.status(200).send(team))
      .catch(err => {
        res.status(500).send({ errormessage: " Couldnt get recent tasks" });
      });
  },
  userJoinProject(req, res, next) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    db.user_join_project([req.params.id, id])
      .then(proj => res.status(200).send(proj))
      .catch(err => {
        res.status(500).send({ errormessage: " Couldnt get recent tasks" });
      });
  }
};
