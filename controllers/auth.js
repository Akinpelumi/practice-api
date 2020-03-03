import { UserService } from '../services';
import { Helper } from '../utils';

const { generateToken } = Helper;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on a Auth Instance.
 *
 * @class AuthController
 */
export default class AuthController{

/**
 * Registers a new user.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response with the registered user's details and a JWT.
 * @memberof AuthController
 */
    static async signup(req, res, next){
        try{
            const user =  new UserService(req.body);
            const { id } = await user.save();
            const token = generateToken({ id });
            delete user.plainPassword;
            res.status(201).json({
                status: 'Success',
                message: 'New user has been created',
                data: {id, ...user, token}
            });
        }catch(e){
            console.log(e);
            const err = new Error('Error creating new user');
            next(err);
        }
    }

/**
 * Log in a user.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response with the registered user's details and a JWT.
 * @memberof AuthController
 */
    static signin(req, res){
        const { user } = req;
        const token = generateToken({ id: user.id });
        res.status(200).json({
            status: 'Success',
            message: 'Successfully signed in user',
            data: {...user, token}
        });
    }
}