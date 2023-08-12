import Joi from "joi";


export const newServiceSchema = Joi.object({
  name: Joi.string().required(),
  userId: Joi.number().integer().required(),
  shortDescription: Joi.string().min(5).max(150).required(),
  longDescription: Joi.string(),
  photo: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  city: Joi.string().required(),
  isActive: Joi.boolean().required(),
  price: Joi.string().required()
})

// export const updateServiceSchema = Joi.object({
//   isActive: Joi.boolean().required()
// })