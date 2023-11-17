import jwt from 'jsonwebtoken';
import Token from '@/utils/interfaces/token.interface';
import UserInterface from '@/resources/user/user.interface';

export const createToken = (user: UserInterface): string => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    })
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        )
    })
}

export default { createToken, verifyToken };