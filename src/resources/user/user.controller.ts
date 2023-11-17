import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import validationMiddleware from "@/middleware/validation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import validate from '@/resources/user/user.validation';
import User from '@/resources/user/user.model';

class UserController implements Controller {
    public path = '/users';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.register),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            
            const user = new User();
            user.name = name;
            user.email = email;
            
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
            await user.save();
            
            res.status(201).json({ user });
        } catch (error) {
            next(new HttpException(400, 'Cannot create user'));
        }
    };
}

export default UserController;