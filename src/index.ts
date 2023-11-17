import 'dotenv/config';
import 'module-alias/register';
import 'reflect-metadata';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/resources/user/user.controller'
import PostController from '@/resources/post/post.controller';

validateEnv();

const app = new App(
    [new UserController(), new PostController()],
    Number(process.env.PORT)
);

app.listen();