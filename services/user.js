import { db , userQueries } from '../db';
import { UserModel } from '../models';
import { Helper } from '../utils';

const { hashPassword } = Helper;
const { allUsers, oneUser, createUser, getUserByEmail, confirmEmail} = userQueries;

/**
 * This is the interface of the user model
 * 
 * @class UserService
 */
export default class UserService extends UserModel {
    constructor(options){
        super(options)
    }
/**
 * Finds a user with properties specified in the argument.
 * @memberof UserService
 * @returns {Promise<object>} A promise object with user detail.
 */
    async save(){
        const { first_name, last_name, email, plainPassword } = this;
        const hash = await hashPassword(plainPassword);
        return db.one(createUser, [first_name, last_name, email, hash]);
    }

/**
 * This is used to find a user based on the unique email address
 * @static
 * @param {string} email - users email
 * @memberof UserService
 * @returns {Promise<object>} A promise object with user detail.
 */
    static fetchByEmail(email){
        return db.oneOrNone(getUserByEmail, [email.toLowerCase()]);
    }

/**
 * This is used to fecth all registered users
 * @static
 * @memberof UserService
 * @returns {object} - A list of all registered users
 */
    static getAllUsers(){
        return db.any(allUsers);
    }

/**
 * This is used to find a used based on the unique ID
 * @static
 * @memberof UserService
 * @param {string | number} id - users ID
 * @returns {object} - The details of the particular user
 */
    static getOneUser(id){
        return db.one(oneUser, id);
    }

/**
 * This is used check if an email is existing
 * @static
 * @memberof UserService
 * @param {string} email email sent by the user
 * @returns {boolean} - Returns a true if the email is existing in the DB and a false, if not
 */
    static emailConfirmation(email){
        return db.oneOrNone(confirmEmail, [email.toLowerCase()]);
    }
}



