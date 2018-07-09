INSERT INTO team
    (team_name)
VALUES($1)
RETURNING *;