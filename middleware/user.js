import { UserService } from '../services';
import { UserSchema } from '../validation';

const { emailConfirmation } = UserService;

/**
 * A collection of middleware methods used to verify the autheticity
 * of a request for a user's account through the user route.
 *
 * @class UserMiddleware
 */
export default class UserMiddleware {
/**
 * This is used to check if the signup fields sent pass the validation test
 * @static
 * @param {Request} req  - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof UserMiddleware
 * @returns {object} - Returns an object (error or response).
 */
  static async signUpValidator(req, res, next) {
    try {
      await UserSchema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  }

  /**
 * This is used to check if the email sent during signup passes every validation written below
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof UserMiddleware
 * @returns {object} -Returns an object (error or response).
 */
  static async signUpEmailValidator(req, res, next) {
    const { email } = req.body;
    if (!email) {
      res.status(401).json({
        status: 'Fail',
        message: 'Email is a required field, please fill in your email'
      });
    } else {
      try {
        const user = await emailConfirmation(email);
        if (user) {
          res.status(409).json({
            status: 'Fail',
            message: 'Email already exist, use another email address'
          });
        } else next();
      } catch (e) {
        res.status(500).json({
          status: 'Fail',
          message: 'Error occurred while validating email, try again'
        });
      }
    }
  }
}
