import Joi from '@hapi/joi';

const UserSchema = Joi.object({
    first_name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .regex(new RegExp('^[a-zA-Z]+$'))
        .messages({
            'string.min': 'Oops why is your firstname that short',
            'string.base': 'First name must be a String',
            'string.empty': 'First name cannot be left empty',
            'string.pattern.base': 'first_name must consist of letters only',
            'any.required': 'First name field is required'
        }),
    last_name: Joi.string()
        .alphanum()
        .required()
        .trim()
        .min(3)
        .max(100)
        .regex(new RegExp('^[a-zA-Z]+$'))
        .messages({
            'string.min': 'Oops why is your lastname that short',
            'string.base': 'Last name must be a String',
            'string.empty': 'Last name cannot be left empty',
            'string.pattern.base': 'Last name must consist of letters only',
            'any.required': 'Last name field is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Please provide an email',
            'string.email': 'You need to provide a valid email address',
            'any.required': 'You need an email to be registered'
        }),
    password: Joi.string()
        .pattern( new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.empty': 'Please provide an password',
            'any.required': 'You need a password to be registered'
        }),
        // .label('your password is not just cool'),
    repeat_password: Joi.ref('password')
})
    .with('first_name', 'last_name')
    .with('password', 'repeat_password');

export default UserSchema;