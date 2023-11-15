import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    excerpt: Joi.string().required(),
    body: Joi.string().required(),
    user: Joi.number(),
});

export default { create };