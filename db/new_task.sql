INSERT INTO "public"."task"
    ("task_name", "task_desc", "task_status", "finished", "user_id", "assigned_proj_id", "due_date")
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- RETURNING "id", "task_name", "task_desc", "task_status", "finished", "user_id", "assigned_proj_id", "due_date";