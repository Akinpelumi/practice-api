import { PostController } from '../controllers';
import { AuthMiddleware, PostMiddleware } from '../middleware';

const express = require('express');

const router = express.Router();
const { authenticate } = AuthMiddleware;
const {
  ownershipConfirmation,
  confirmPostExist,
  createPostValidator,
  postValidator
} = PostMiddleware;
const { createPost } = PostController;

router.use(authenticate);

router.post('/', createPostValidator, postValidator, createPost);
router.get('/', PostController.getPosts);
router.get('/user', PostController.getOwnPosts);
router.get('/:id', PostController.getOnePost);

router.use('/:id', confirmPostExist, ownershipConfirmation);

router.put('/:id', PostController.updateOnePost);
router.delete('/:id', PostController.deletePost);

export default router;
