const Joi = require('joi');

module.exports = {
    body: Joi.object({
        bookName: Joi.string().required().messages({
            "any.required": "BookName is required",
            "string.empty": "BookName cannot be empty",
        }),

        author: Joi.string().required().messages({
            "any.required": "Author is required",
        }),
       description: Joi.string().required().messages({
            "any.required": "Description is required",
            "string.empty": "Description cannot be empty",
        }),
        rating: Joi.number().min(0).max(5),
        genre: Joi.string().required().messages({
            "any.required": "Genre is required",
            "string.empty": "Genre cannot be empty",
        }),

    }),
  
}