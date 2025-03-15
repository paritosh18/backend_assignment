const Joi = require('joi');

module.exports = {
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .messages({ 'any.required': 'Email address is required' }),

    password: Joi.string()
      .required()
      .messages({ 'any.required': 'Password is required' }),

  }),

  
}