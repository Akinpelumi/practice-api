import { UserController } from '../controllers';

const express = require('express');

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getOneUser);

export default router;
