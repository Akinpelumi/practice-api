const express = require('express');
const router = express.Router();
import { UserController } from '../controllers';

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getOneUser);

export default router;