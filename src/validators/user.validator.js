import Joi from '@hapi/joi';

export const userRegistrationValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ]}}),
    password: Joi.string().min(8).max(16).required(),
    phone: Joi.string().length(10).pattern(/^\d+$/).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Incorrect Details : ${error}`
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
