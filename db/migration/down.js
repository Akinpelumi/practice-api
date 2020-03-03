import { db } from '..';

const dropPostTable =`
DROP TABLE IF EXISTS posts CASCADE;
`;

const dropUserTable = `
DROP TABLE IF EXISTS users CASCADE;
`;

const down = (...queries) => db.query(queries.reduce((prev,curr)=> prev + curr));

export {
    down, dropPostTable, dropUserTable
}