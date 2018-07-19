SELECT pr.*
FROM projects pr
    JOIN team_proj tp ON tp.proj_id = pr.id
    JOIN team t ON t.id = tp.team_id
WHERE t.id = $1;
