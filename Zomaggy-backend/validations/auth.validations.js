const Joi = require('joi');
const sendResponse = require('../helpers/requestHandler.helper');

const registerValidation = async (req,res,next) =>{
    try{
        const schema = Joi.object({
            // name: Joi.string()
            // .required()
            // .messages({ "string.empty": "Name field cannot be empty." })
            // .pattern(/^[a-zA-Z\\s]*$/),
          email: Joi.string().email().messages({
            "string.empty": "Please add an email.",
            "string.email": "Please add an valid email.",
          }),
          //password: Joi.string().required(),
          phoneNumber: Joi.string()
            .min(6)
            .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
            .messages({
              "string.pattern.base": "Invalid phone number.",
            }),
            //location: Joi.string().required()
        }).options({ allowUnknown: true });

        const { value, error } = schema.validate(req.body);

        if (error !== undefined) {
          return sendResponse(res, false, 422, error.details[0].message);
        }
    
        // set the variable in the request for validated data
        req.validated = value;
        next();
    }
    catch(error){
        next(error);
    }
};

const loginValidation = async(req,res,next) =>{
  try{
    const schema = Joi.object({
      email: Joi.string().email().messages({
        "string.empty": "Please add an email.",
        "string.email": "Please add an valid email.",
      }),
      phoneNumber: Joi.string()
        .min(6)
        .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
        .messages({
          "string.pattern.base": "Invalid phone number.",
        })
    }).options({ allowUnknown: true });

    const { value, error } = schema.validate(req.body);

    if (error !== undefined) {
      return sendResponse(res, false, 422, error.details[0].message);
    }

    // set the variable in the request for validated data
    req.validated = value;
    next();
}
catch(error){
    next(error);
}
};



module.exports = {
    registerValidation,
    loginValidation
};
