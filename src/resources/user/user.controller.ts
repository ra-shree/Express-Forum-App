import { Router, Request, Response, NextFunction } from 'express';
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from '@/resources/user/user.validation';
import UserInterface from '@/resources/user/user.interface';
import UserService from '@/resources/user/user.service';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.index
        );

        this.router.post(
            `/register`,
            validationMiddleware(validate.register),
            this.register
        );

        this.router.post(
            '/login',
            validationMiddleware(validate.login),
            this.login
        );
    }

    private index = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const result = await this.userService.index();

            res.status(200).json(result);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {email, password} = req.body;
            const token = await this.userService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const user: UserInterface = {
                name: name,
                email: email,
                password: password,
            };
            
            const result = await this.userService.create(user);

            res.status(201).json(result);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;