import Joi from "joi"

export const signUpSchema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().email().required(),
  password:Joi.string().min(3).required().label('Password'),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').options({messages: {'any.only':'{{#label}} não é igual à password'}}),
  telephone: Joi.string().min(10).max(11).required(),
  city: Joi.string().required(),
  photo: Joi.string().uri({ scheme: ['http', 'https'] }),
  userType: Joi.string().required()
})

export const signInSchema = Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().min(3).required().label('Password')
})