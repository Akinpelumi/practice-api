import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.SECRET;

/**
 *Contains Helper methods
 *
 * @class Helper
 */
class Helper {
  /**
   * This is used to hash plain passwords users register with
   * @static
   * @param {string} plainPassword - password to be encrypted
   * @memberof Helper
   * @returns {Promise<string>} - encrypted password
   */
  static hashPassword(plainPassword) {
    return bcrypt.hash(plainPassword, 10);
  }

  /**
   * This is used to check if the password used to login tallies with the hashed password in the DB
   * @static
   * @param {string} plainPassword - plain password sent by the user to login
   * @param {string} hash - hashed password to be compared against
   * @memberof Helper
   * @returns {Promise<boolean>} - returns a true if the plain password sent tallies
   * the hashed in the DB and a false if it does not tally
   */
  static comparePassword(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
  }

  /**
   * Synchronously signs the given payload into a JSON Web Token string.
   * @static
   * @param {string | number | Buffer | object} payload - payload to sign
   * @param {string | number} expiresIn - Expressed in seconds or a string describing a
   * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 2 hours.
   * @memberof Helper
   * @returns {string} - JWT Token
   */
  static generateToken(payload, expiresIn = '2h') {
    return jwt.sign(payload, secret, { expiresIn });
  }

  /**
   * This verify the JWT token with the secret with which the token was issued with
   * @static
   * @param {string} token - JWT Token
   * @memberof Helper
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   */
  static verifyToken(token) {
    return jwt.verify(token, secret);
  }

  /**
   * Checks for token in the authorization and x-access-token header properties.
   * @static
   * @param {object} authorization - The headers object
   * @memberof Helper
   * @returns {string | null} - Returns the Token or Null
   */
  static checkAuthorizationToken(authorization) {
    let bearerToken = null;
    if (authorization) {
      const token = authorization.split(' ')[1];
      bearerToken = token || authorization;
    }
    return bearerToken;
  }

  /**
   * Aggregrates a search for the access token in a number of places.
   * @static
   * @param {Request} req - The express request object.
   * @memberof Helper
   * @returns {string | null} - Returns the Token or Null
   */
  static checkToken(req) {
    const {
      headers: { authorization }
    } = req;
    const bearerToken = Helper.checkAuthorizationToken(authorization);
    return (
      bearerToken
      || req.headers['x-access-token']
      || req.headers.token
      || req.body.token
    );
  }
}

export default Helper;
