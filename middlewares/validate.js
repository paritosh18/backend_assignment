const httpStatus = require("http-status");
const ApiError = require("../utils/handler/ApiError.handler");
const pick = require("../utils/handler/pick.handler");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  let errors = [];

  Object.keys(validSchema).forEach((key) => {
    const { error, value } = validSchema[key].validate(object[key], { abortEarly: false });

    if (error) {
      errors = errors.concat(error.details.map((detail) => detail.message));
    } else {
      req[key] = value; 
    }
  });

  if (errors.length) {
    return next(new ApiError(httpStatus.BAD_REQUEST, errors.join(", ")));
  }

  next();
};

module.exports = validate;
