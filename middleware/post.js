import { PostService } from '../services';
import { PostSchema } from '../validation';

const { postConfirmation } = PostService;

/**
 * A collection of middleware methods used to verify the autheticity
 * of a request for a post through the post route.
 *
 * @class PostMiddleware
 */
export default class PostMiddleware {
/**
 * This is used to check if the user owns a particular post
 * @static
 * @param {Request} req  - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof PostMiddleware
 * @returns {object} - Returns an object (error or response).
 */
  static ownershipConfirmation(req, res, next) {
    if (!req.post) {
      return res.status(500).json({
        status: 'fail',
        message: 'Sorry but we cannot confirm you are the owner of the post'
      });
    }

    return req.decoded.id === req.post.user_id ? next()
      : res.status(403).json({
        status: 'fail',
        message: "You cannot perform this operation because you don't own this post"
      });
  }

  /**
 * This is used to check if a post exists already in the DB
 * @static
 * @param {Request} req  - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof PostMiddleware
 * @returns {object} - Returns an object (error or response).
 */
  static async confirmPostExist(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          status: 'fail',
          message: 'Post id is required as a query parameter'
        });
      } else {
        const post = await PostService.getOnePost(+id);
        if (!post) {
          res.status(404).json({
            status: 'fail',
            message: 'No post with the id exist'
          });
        } else {
          req.post = post;
          next();
        }
      }
    } catch (e) {
      const exp = /invalid input \w+/i;
      if (exp.test(e.message)) {
        res.status(400).json({
          status: 'fail',
          message: 'It appears you have provided an invalid post id, it is definitely not a number'
        });
      } else {
        res.status(500).json({
          status: 'fail',
          message: 'Error validating post'
        });
      }
    }
  }

  /**
 * This is used to check if the create post fields sent pass the validation test
 * @static
 * @param {Request} req  - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof PostMiddleware
 * @returns {object} - Returns an object (error or response).
 */
  static async postValidator(req, res, next) {
    try {
      const { heading } = req.body;
      console.log(heading);
      const body = heading ? { ...req.body, heading: heading.trim() } : req.body;
      await PostSchema.validateAsync(body);
    } catch (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  }

  /**
 * This is used to check if the post sent during create post passes every validation written below
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {function} next - Call the next operation.
 * @memberof PostMiddleware
 * @returns {object} -Returns an object (error or response).
 */
  static async createPostValidator(req, res, next) {
    const { post } = req.body;
    if (!post) {
      res.status(401).json({
        status: 'Fail',
        message: 'Post is a required field, please enter a post'
      });
    } else {
      try {
        const newPost = await postConfirmation(post);
        if (newPost) {
          res.status(409).json({
            status: 'Fail',
            message: 'Post already exist, enter an entirely new post'
          });
        } else next();
      } catch (e) {
        res.status(500).json({
          status: 'Fail',
          message: 'Error occured while validating the post, try again'
        });
      }
    }
  }
}
