import Joi from '@hapi/joi';

const PostSchema = Joi.object({
    heading: Joi.string()
        .required()
        .max(150)
        .messages({
            'string.max': 'Ooops Your heading is way too long',
            'string.empty': 'Heading cannot be left empty',
            'any.required': 'Your post needs a heading to be posted'
        }),
    post: Joi.string()
        .required()
        .max(1000)
        .regex(new RegExp('[a-zA-Z0-9]+\s+'))
        .trim()
        .messages({
            'string.max': 'Ooops Your post is way too long',
            'string.empty': 'Post cannot be left empty',
            'any.required': 'Your need a post to post a post'
        }),
})

export default PostSchema;