import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
});

export default { register, login };