import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        POSTGRES_USER: str(),
        POSTGRES_PASSWORD: str(),
        POSTGRES_DATABASE: str(),
        POSTGRES_PORT: port({ default: 5432 }),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
    })
}

export default validateEnv;