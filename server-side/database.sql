-- THIS FILE ARE JUST SOME SQL COMMANDS TO HAVE AS A REFERENCE--
-- NOT IMPORTANT FILE --

CREATE DATABASE perntodo;

CREATE TABLE todos(
  todo_id SERIAL PRIMARY KEY,
  todo_description VARCHAR(255)
);

SELECT * FROM todos;

INSERT INTO todos(todo_description) VALUE ($1);
DELETE FROM todos WHERE todo_id = 2;
