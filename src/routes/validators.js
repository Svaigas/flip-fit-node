const mongoIdRegexExpr = /^[0-9a-fA-F]{24}$/
const { celebrate, Joi, Segments } = require('celebrate')
const idError = 'Invalid Object ID'

export const validateGETandDEL = celebrate({
  [Segments.QUERY]: Joi.object({
    currency: Joi.string().length(3)
  }),
  [Segments.PARAMS]: Joi.object({
    type: Joi.string().valid('product', 'cart').required(),
    id: Joi
        .string()
        .regex(mongoIdRegexExpr)
        .required()
        .error(new Error(idError))
  })
})

export const validatePOSTproduct = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    description: Joi.string(),
    price: Joi.number().required()
  })
})

export const validatePOSTcart = celebrate({
  [Segments.BODY]: Joi.object({
    products: Joi.array().items(Joi
        .string()
        .regex(mongoIdRegexExpr)
        .required()
        .error(new Error(idError)))
  })
})

export const validatePUTproduct = celebrate({
  [Segments.PARAMS]: Joi.object({
    type: Joi.string().valid('product', 'cart').required(),
    id: Joi
        .string()
        .regex(mongoIdRegexExpr)
        .required()
        .error(new Error(idError))
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string(),
    quantity: Joi.number(),
    description: Joi.string(),
    price: Joi.number()
  })
})

export const validatePUTcart = celebrate({
  [Segments.PARAMS]: Joi.object({
    type: Joi.string().valid('product', 'cart').required(),
    id: Joi
        .string()
        .regex(mongoIdRegexExpr)
        .required()
        .error(new Error(idError))
  }),
  [Segments.BODY]: Joi.object({
    products: Joi.array().items(Joi
        .string()
        .regex(mongoIdRegexExpr)
        .required()
        .error(new Error(idError)))
  })
})
