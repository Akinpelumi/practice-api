import { UserService } from '../services';


/**
 * A collection of methods that controls the success response
 * for CRUD operations on a User Instance.
 *
 * @class UserController
 */
export default class UserController {

/**
 * Fetches all Users.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof UserController
 */
    static async getUsers(req, res, next){
        try{
            const data = await UserService.getAllUsers();
            res.status(200).json({
                status: 'Success',
                data,
                message: 'All users on display'
            });
        }catch(e){
            const err = new Error('Error fetching users');
            next(err);
        }
    }

/**
 * Fetches one User.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof UserController
 */
    static async getOneUser(req, res, next){
        try{
            const data = await UserService.getOneUser(req.params.id);
            res.status(200).json({
                status: 'Success',
                data,
                message: 'Requested user on display'
            });
        }catch(e){
            const err = new Error('Error fecthing the particular user');
            next(err);
        }
    }
}