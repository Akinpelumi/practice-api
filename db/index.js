var promise = require('bluebird');
var pg = require('pg-promise')
import config from '../config';
import { userQueries, postQueries } from './queries'


var options = {
    promiseLib: promise
}
var pgp = pg(options);
const db = pgp(config.DATABASE_URL);

export {
    db,
    userQueries,
    postQueries
}
