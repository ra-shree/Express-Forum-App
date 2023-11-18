import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from '@/resources/user/user.service';

async function authenticationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        const userRepository = new UserService();
        const user = await userRepository.show(payload.id);

        if (!user) {
            next(new HttpException(401, 'Unauthorized'));
        }

        req.user = user;

        next();
    } catch (e: any) {
        next(new HttpException(401, 'Unauthorized'));
    }
}

export default authenticationMiddleware;