import config from '../config';

import { userQueries, postQueries } from './queries';

const promise = require('bluebird');
const pg = require('pg-promise');


const options = {
  promiseLib: promise
};
const pgp = pg(options);
const db = pgp(config.DATABASE_URL);

export {
  db,
  userQueries,
  postQueries
};
