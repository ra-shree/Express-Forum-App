import bcrypt from 'bcrypt';
import token from '@/utils/token';
import Service from "@/utils/interfaces/services.interface";
import UserModel from '@/resources/user/user.model';
import UserInterface from '@/resources/user/user.interface';

class UserService implements Service<UserInterface> {
    async index(): Promise<UserInterface[]> {
        const users = await UserModel.find();
        const result: UserInterface[] = [];

        if (!users) {
            throw new Error('There are no users');
        }

        users.forEach((user) => {
            result.push({
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        })

        return result;
    }

    async create(item: UserInterface): Promise<UserInterface> {
        const user = new UserModel();

        if (!item.name || !item.email || !item.password) {
            throw new Error('Please provide all the fields.')
        }
        
        const existingUser = await UserModel.findOne({
            select: {
                id: true,
            },
            where: {
                email: item.email,
            }
        });
        
        if (existingUser) {
            throw new Error('User already exists.');
        }

        const hash = await bcrypt.hash(item.password, 10);
        user.name = item.name;
        user.email = item.email;
        user.password = hash;
        await user.save();

        return  {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async update(key: number, item: UserInterface): Promise<UserInterface> {
        const user = await UserModel.findOne({
            select: {
                id: false,
            },
            where: {
                id: key
            }
        })
        
        if (!user) {
            throw new Error('User does not exist.');
        }

        user.email = item.email ?? user.email;
        user.name = item.name ?? user.name;
        user.password = item.password ?? user.password;
        await user.save();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }

    async delete(key: number): Promise<boolean> {
        const user = await UserModel.findOne({
            select: {
                id: false,
            },
            where: {
                id: key
            }
        })

        if (!user) {
            throw new Error('User does not exist.');
        }

        await user.remove();

        return true;
    }

    async show(key: number): Promise<UserInterface> {
        const user = await UserModel.findOne({
            select: {
                id: false,
            },
            where: {
                id: key
            }
        })

        if (!user) {
            throw new Error('User does not exist.');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async login(email: string, password: string): Promise<string> {
        const user = await UserModel.findByEmail(email);

        if (!user) {
            throw new Error('User does not exist.');
        }

        if (await bcrypt.compare(password, user.password)) {
            return token.createToken({ id: user.id });
        }

        throw new Error('Invalid Credentials.');
    }
}

export default UserService;