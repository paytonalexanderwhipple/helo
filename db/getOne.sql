SELECT p.id, p.title, p.img, p.content, author_id , u.username FROM posts as p
    JOIN users as u ON p.author_id = u.id
    WHERE p.id = $1