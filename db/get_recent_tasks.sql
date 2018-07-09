SELECT *
FROM task
WHERE user_id = $1
ORDER BY id DESC