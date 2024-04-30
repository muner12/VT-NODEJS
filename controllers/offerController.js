const Joi = require('joi');

const Offer=require('../models/offer');
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




const offerController = async (req, res,next) => {
    console.log(process.pid)
    const schema = Joi.object({
        name: Joi.string().required(),
        language: Joi.string().valid('en_US').required(),
        category: Joi.string().valid('MARKETING').required(),
        components: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('HEADER', 'BODY', 'FOOTER', 'BUTTONS').required(),
                format: Joi.string().valid('IMAGE').when('type', { is: 'HEADER', then: Joi.required() }), // Required if type is HEADER
                example: Joi.object({
                    header_handle: Joi.array().items(Joi.string()),
                    body_text: Joi.array().items(Joi.array().items(Joi.string())), 
                }).when('type', {
                    is: Joi.valid('BODY', 'HEADER'),
                    then: Joi.required() 
                }), 
                text: Joi.string().when('type',{
                    is:Joi.valid('BODY','FOOTER'),
                    then:Joi.required()
                }), 
                buttons: Joi.array().items(
                    Joi.object({
                        type: Joi.string().valid('PHONE_NUMBER', 'URL').required().messages({'any.required': 'Type is messing from Button or Label Fields'}),
                        text: Joi.string().required(), 
                        phone_number: Joi.string().when('type', { is: 'PHONE_NUMBER', then: Joi.required() }), 
                        url: Joi.string().when('type', { is: 'URL', then: Joi.required() }), 
                        example: Joi.array().items(Joi.string()) 
                    })
                )
            })
        ).custom(countCurlyBraces, 'custom validation')
    });
    
    
    
    const {error} = schema.validate(req.body);
  
    if(error){
    return   next(error)
    }
    
   
    
    try {
        
        const newOffer=await Offer.create(req.body)
        const result=await newOffer.save();

        res.status(200).json({
            STATUS:'SUCCESS',
            ERROR:"",
            ERROR_CODE:"",
            ERROR_MESSAGE:"",
            DB_DATA:result,
        })

    } catch (error) {
        next(error)
    }

    

}


module.exports = offerController


