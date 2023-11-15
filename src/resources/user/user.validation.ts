import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export default { create };