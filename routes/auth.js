import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middleware';
import { UserMiddleware } from '../middleware';

const { signup, signin  } = AuthController;
const { validateLoginInfo } = AuthMiddleware;
const { signUpValidator, signUpEmailValidator } = UserMiddleware;

const router = Router();


router.post('/signup', signUpEmailValidator, signUpValidator, signup);
router.post('/signin', validateLoginInfo, signin);


export default router;
