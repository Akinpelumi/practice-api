/**
 * Contain user method
 * @class User
 *
 */
class User {
  /**
   *This is used to define the users model
   * @param {object} options -contains the major requirements from a user
   */
  constructor(options) {
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.email = options.email.toLowerCase();
    this.plainPassword = options.password;
  }
}

export default User;
