insert into 
projects
    (project_name, project_desc)
VALUES
    ($1, $2)
RETURNING *;

