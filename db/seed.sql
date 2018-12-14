DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    profile_pic TEXT
);

INSERT INTO users (username, password, profile_pic)
    VALUES ('test1', '12345', 'test1');
INSERT INTO users (username, password, profile_pic)
    VALUES ('test2', '12345', 'test2');
INSERT INTO users (username, password, profile_pic)
    VALUES ('test3', '12345', 'test3');

SELECT * FROM users;

DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INTEGER REFERENCES users(id)
);

INSERT INTO posts (title, img, content, author_id)
    VALUES ('test1', 'test1', 'its a post!', 1);
INSERT INTO posts (title, img, content, author_id)
    VALUES ('test2', 'test2', 'its a post!', 2);
INSERT INTO posts (title, img, content, author_id)
    VALUES ('test3', 'test3', 'its a post!', 3);

SELECT * FROM posts;
