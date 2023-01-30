import express, { Request, Response, NextFunction } from 'express';
import { LoginController } from '../controllers/login.controller';
var router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
    const loginController = new LoginController()
    loginController.loginForm(req, res);
});

module.exports = router;
