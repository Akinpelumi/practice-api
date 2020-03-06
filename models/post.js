/**
 * Contain Post method
 * @class Model
 */
class Model {
  /**
   *This is used to define the users model
   * @param {object} options - contains the major requirements from a post
   */
  constructor(options) {
    this.user_id = options.user_id;
    this.heading = options.heading;
    this.post = options.post;
  }
}

export default Model;
