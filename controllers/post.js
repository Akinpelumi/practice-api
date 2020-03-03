import { PostService } from '../services';

/**
 * A collection of methods that controls the success response
 * for CRUD operations on a Post Instance.
 *
 * @class PostController
 */
export default class PostController {

/**
 * Creates Posts.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof PostControllers
 */
    static async createPost (req, res, next){
        try{
            const reqBody = { user_id: req.decoded.id, ...req.body };
            const post = new PostService(reqBody);
            const { id } = await post.save();
            res.status(201).json({
                status: 'Success',
                message: 'New post has been created',
                data: {id, ...post}
            });
        }catch(e){
            console.log(e);
            const err = new Error('Error creating new post');
            next(err);
        }
    }

/**
 * Fetches all Posts.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof PostController
 */
    static async getPosts (req, res, next) {
        try{
            console.log(req.query);
            const data = await PostService.getAllPosts();
            res.status(200).json({
                status: 'Success',
                data,
                message: 'All posts on display'
            });
        }catch(e){
            const err = new Error('Error fetching posts');
            next(err);
        }
    }

/**
 * Fetches all Own Posts.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof PostController
 */
    static async getOwnPosts (req, res, next) {
        try{
            const data = await PostService.getAllOwnPosts(req.decoded.id);
            res.status(200).json({
                status: 'Success',
                data,
                messages: 'All own posts on display'
            });
        }catch(e) {
            const err = new Error('Error fecthing own posts');
            next(err);
        }
    }

/**
 * Fetches one Post.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof PostController
 */
    static async getOnePost (req, res, next) {
        try{
            const data = await PostService.getOnePost(req.params.id);
            res.status(200).json({
                status: 'Success',
                data,
                message: 'Requested post on display'
            });
        }catch(e){
            const err = new Error('Error fetching particular post');
            next(err);
        }
    }

/**
 * Update a Post.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof PostController
 */
    static async updateOnePost (req, res, next) {
        try{
            const data = await PostService.updatePost(req.body.heading, req.body.post, req.params.id);
            res.status(201).json ({
                status: 'Success',
                message: 'post updated succesfully'
            });
        }catch(e){
            const err = new Error('Error updating the post');
            next(err);
        }
    }
/**
 * Delete a Post.
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the answers.
 * @memberof PostController
 */
    static async deletePost (req, res, next) {
        try{
            const data = await PostService.deleteOnePost(req.params.id);
            res.status(200).json({
                status: 'Success',
                message: `Post deleted successfully`
            });
        }catch(e){
            const err = new Error('Failed to delete the post');
            next(err);
        }
    }
}