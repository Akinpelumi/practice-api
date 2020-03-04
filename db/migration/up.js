import { db } from '..';

const createUserTable = `
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE (email)
);
`;

const createPostTable = `
CREATE TABLE IF NOT EXISTS posts
(
    id SERIAL NOT NULL,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
    heading VARCHAR(255) NOT NULL,
    post TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE (post)
);
`;

const up = (...queries) => db.query(queries.reduce((prev, curr) => prev + curr));

export {
  up, createUserTable, createPostTable
};
