import { Request, Response } from 'express';

export class LoginController {
    loginForm = (req: Request, res: Response) => {
        res.render('login');
    }
}