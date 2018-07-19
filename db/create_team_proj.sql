INSERT INTO team_proj
    (team_id, proj_id)
VALUES
    ($1, $2)
returning *;