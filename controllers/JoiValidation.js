const Joi = require('joi');
const countCurlyBraces = (value, helpers) => {
    
    const text = value[1].text;
    const bodyText = value[1].example.body_text[0];
    
    const curlyBraceCount = (text.match(/{{/g) || []).length;
    const bodyTextLength = bodyText.length;

    if (curlyBraceCount !== bodyTextLength) {
       
        return helpers.error('any.invalid', { message: 'Number of placeholders in text must match the number of elements in body_text array' });
    }

    return value;
};
const whatsappTemplateValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': "The 'name'  field is  required.",
  }),
  language: Joi.string().required().messages({
    'any.required': 'The "language" field is required.',
  }),
  category: Joi.string().valid('MARKETING', 'UTILITY', 'AUTHENTICATION').required().messages({
    'any.required': 'The "category" field is required.',
    'any.only': "Invalid category value '{{#value}}'.",
  }),
  components: Joi.array().required().messages({
    'any.required': 'The "components" field must be an array.',
  }).items(Joi.object({
    type: Joi.string().valid('HEADER', 'BODY', 'FOOTER', 'BUTTONS').required().messages({
      'any.required': 'Each component must have a "type" field.',
      'any.only': "Invalid component type '{{#value}}'.",
    }),
    format: Joi.when('type', {
      is: 'HEADER',
      then: Joi.string().valid('IMAGE', 'TEXT', 'LOCATION', 'DOCUMENT', 'VIDEO').required().messages({
        'any.required': 'Invalid component format for HEADER.',
        'any.only': 'Invalid component format for HEADER.',
      }),
    }),
    example: Joi.when('format', {
      is: Joi.string().valid('IMAGE', 'DOCUMENT'),
      then: Joi.object({
        header_handle: Joi.array().items(Joi.string()).required().messages({
          'any.required': 'Invalid header_handle format for HEADER with {{#valids}} format.',
        }),
      }).messages({
        'any.required': 'Invalid header_handle format for HEADER with {{#valids}} format.',
      }),
    }),
    text: Joi.when('type', {
      is: 'BODY',
      then: Joi.string().required().messages({
        'any.required': 'Text is required for BODY component.',
      }),
    }),
    example: Joi.when('type', {
      is: 'BODY',
      then: Joi.object({
        body_text: Joi.array().items(Joi.array().items(Joi.string())).required().messages({
          'any.required': 'Example property with sample variable value cannot be empty for BODY component with TEXT format containing placeholders.',
        }),
      }),
    }),
    buttons: Joi.when('type', {
      is: 'BUTTONS',
      then: Joi.array().items(Joi.object({
        type: Joi.string().valid('PHONE_NUMBER', 'URL', 'QUICK_REPLY', 'COPY_CODE').required().messages({
          'any.required': 'Invalid type for button.',
          'any.only': 'Invalid type for button.',
        }),
        text: Joi.string().required().max(25).messages({
          'any.required': 'Invalid or missing text for button.',
          'string.max': 'Invalid or missing text for button. Maximum 25 characters allowed.',
        }),
        phone_number: Joi.when('type', {
          is: 'PHONE_NUMBER',
          then: Joi.string().required().max(20).messages({
            'any.required': 'Invalid or missing phone number for button.',
            'string.max': 'Invalid or missing phone number for button.',
          }),
        }),
        url: Joi.when('type', {
          is: 'URL',
          then: Joi.string().required().max(2000).messages({
            'any.required': 'Invalid or missing URL for URL button.',
            'string.max': 'Invalid or missing URL for URL button.',
          }),
        }),
        example: Joi.when('type', {
          is: 'URL',
          then: Joi.array().items(Joi.string().max(2000)).required().messages({
            'any.required': 'Invalid or missing example for URL button. Must be an array with a single string, maximum 2000 characters allowed.',
          }),
        }),
      })).required().messages({
        'any.required': 'Buttons must be an array.',
      }),
    }),
  })
).required().custom(countCurlyBraces,'custom validation'),
});

const validationResponse = (req, res, next) => {

 
    
  const { error } = whatsappTemplateValidation.validate(req.body);
    
   
  
  if (error) {
    let validationError= error.details[0].context.message ?
    error.details[0].context.message :
    error.details[0].message
    return res.status(400).json({
        STATUS: "ERROR",
        ERROR_FILTER: "VALIDATION_ERROR",
        ERROR_CODE: "SPXT-V",
        ERROR_DESCRIPTION: validationError
    })
  }else{
     return res.json({
        STATUS: "SUCCESS",
     })
  }

 
  
};

module.exports = { whatsappTemplateValidation, validationResponse };
