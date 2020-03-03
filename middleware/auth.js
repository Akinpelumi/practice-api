import { UserService } from '../services';
import {  Helper } from '../utils'; 

const { fetchByEmail } = UserService;
const { comparePassword, checkToken, verifyToken} = Helper;

/**
 * A collection of middleware methods used to verify the autheticity
 * of a user's request through the Auth route.
 * 
 * @class AuthMiddleware
 */
export default class AuthMiddleware{

/**
 * This is to ensure that the login info supplied tallies with what is in the DB
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof AuthMiddleware
 * @returns {object} - Returns an object (error or response).
 */
    static async validateLoginInfo(req, res, next) {
        const { email, password } = req.body;
        if( !email || !password)
            res.status(401).json({
                status: 'fail',
                message: 'email/password fields are required'
            })
        else{
            const user = await fetchByEmail(email);
            if(!user)
             res.status(401).json({
                 status: 'fail',
                 message: 'invalid email/password'
             })
             else{
                 const isCorrectPassword = await comparePassword(password, user.password);
                 if(isCorrectPassword) {
                     delete user.password;
                     req.user = user;
                     next()
                    }
                 else res.status(401).json({
                     status: 'fail',
                     message: 'invalid email/password'
                 })
             }
        }
    }

/**
 * Verifies the validity of a user's access token or and the presence of it
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof AuthMiddleware
 * @returns {object} - Returns an object (error or response).
 */
    static authenticate(req, res, next){
        const token = checkToken(req);
        if(!token)
        res.status(401).json({
            status: 'fail',
            message: 'Access denied, token is required'
        })
        else{
           try {
                const decoded = verifyToken(token);
                req.decoded = decoded;
                next();
           }
           catch(e){
            res.status(401).json({
                status: 'fail',
                message: 'Access denied, token is invalid'
            })
           }
        }
    }
}