import { Request, Response } from 'express';
import { UserService } from "../services/user.service"
import { User, BaseUser } from '../models/user.model';

export class RegisterController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService
    }

    registerForm = (req: Request, res: Response) => {
        res.render('register');
    }

    submitForm = (req: Request, res: Response) => {
        const body = req.body
        const rawUser: BaseUser = {
            username: body.username,
            password: body.password,
            email: body.email
        }

        this.userService.findByUsername(rawUser.username)
            .then((user: User|null) => {
                if (user) {
                    // req.flash("warning", "This email address is already registered. <a href='/login'>Log in!</a>")
                    res.redirect("/login")
                    return
                } else {
                    this.userService.create(rawUser)
                    .then(() => {
                        // req.flash("warning", "This email address is already registered. <a href='/login'>Log in!</a>")
                        res.redirect("/login")
                        return
                    })
                    .catch((err: Error) => {
                        res.status(500).send("Something wrong")
                        console.error(err)
                        return
                    })        
                }
            })
            .catch((err: Error) => {
                res.status(500).send("Something wrong")
                console.error(err)
                return
            })
    }
}