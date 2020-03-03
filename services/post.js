import { db, postQueries } from '../db';
import { PostModel } from '../models'

const { allPosts, onePost, allOwnPosts, createPost, updatePost, deletePost, confirmPost } = postQueries;

/**
 * This is the interface of the post model
 * 
 * @class PostService
 */
export default class PostService extends PostModel {
    constructor(options){
        super(options)
    }
/**
 * Finds a post with properties specified in the argument.
 * @memberof PostService
 * @returns {Promise<object>} A promise object with post detail.
 */
    async save() {
        const { user_id, heading, post } = this;
        return db.one(createPost, [user_id, heading, post]);
    }

/**
 * Finds all the posts
 * @static
 * @memberof PostService
 * @returns {object} - List of all existing posts
 */
    static getAllPosts(){
        return db.any(allPosts);
    }

/**
 * This is used to get a particular post
 * @static
 * @param {string | number} id - The post ID
 * @memberof PostService
 * @returns {object} - The particular post requested for
 */
    static getOnePost(id){
        return db.oneOrNone(onePost, id);
    }

/**
 * This is used to get only the posts created by each individual user
 * @static
 * @param {string | number} user_id  The user ID
 * @memberof PostService
 * @returns {object} - A list of all posts by the user
 */
    static getAllOwnPosts(user_id){
        return db.any(allOwnPosts, [user_id]);
    }

/**
 * This is used to update a post
 * @static
 * @param {string} heading - updated heading of the post
 * @param {string} post - updated post
 * @param {string | number} id the post ID which is immutable
 * @memberof PostService
 * @returns {object} - The post that has been updated
 */
    static updatePost(heading, post, id){
        return db.none(updatePost, [heading, post, id]);
    }

/**
 * This is used to delete a post
 * @static
 * @param {string | number} id - the post ID
 * @memberof PostService
 * @returns {null}
 */
    static deleteOnePost(id){
        return db.result(deletePost, id);
    }

/**
 * This is used check if an post is existing
 * @static
 * @memberof PostService
 * @param {string} post post sent by the user
 * @returns {boolean} - Returns a true if the post is existing in the DB and a false, if not
 */
    static postConfirmation(post){
        return db.oneOrNone(confirmPost, [post]);
    }
}