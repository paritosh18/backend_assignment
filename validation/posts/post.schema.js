const Joi = require('joi');

module.exports = {
    body: Joi.object({
        postName: Joi.string().required().messages({
            "any.required": "Post Name is required",
            "string.empty": "Post Name cannot be empty",
        }),

        description: Joi.string().required().messages({
            "any.required": "Description is required",
            "string.empty": "Description cannot be empty",
        }),

        uploadTime: Joi.date().default(() => new Date()),

        tags: Joi.array().items(Joi.string()).optional(),

        imageUrl: Joi.string().optional().uri().messages({
            "string.uri": "Image URL must be a valid URL",
        }),
    }),


}