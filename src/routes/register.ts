import express, { Request, Response, NextFunction } from 'express';
import { RegisterController } from '../controllers/register.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
var router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    const registerController = new RegisterController(userService)
    registerController.registerForm(req, res);
});

router.post('/', function(req: Request, res: Response, next: NextFunction) {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    const registerController = new RegisterController(userService)
    registerController.submitForm(req, res);
});

module.exports = router;
