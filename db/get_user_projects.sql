-- select *
-- from projects
-- where id = $1;


SELECT pr.*, u.id
FROM projects pr
    JOIN proj_user pu ON pu.proj_id = pr.id
    JOIN users u ON pu.user_id = u.id
WHERE u.id = $1;