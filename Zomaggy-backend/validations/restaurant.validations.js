const Joi = require('joi');
const sendResponse = require('../helpers/requestHandler.helper');


const restaurantValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            // .message({
            //     "string.empty":"Please add the restaurant name"
            // }),
            location: Joi.required(),
            address: Joi.required(),
            // .message({
            //     "string.empty":"Please add the location of restaurant"
            // })
            openTime: Joi.required(),
            closeTime: Joi.required()

        }).options({ allowUnknown: true });
        const { value, error } = schema.validate(req.body);

        if (error !== undefined) {
            return sendResponse(res, false, 422, error.details[0].message);
        }

        // set the variable in the request for validated data
        req.validated = value;
        next();
    } catch (err) {
        next(err)
    }

};

const addDishValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            restaurantId: Joi.required(),
            categoryId: Joi.required(),
            name: Joi.required(),
            description: Joi.required(),
            price: Joi.required(),
        }).options({ allowUnknown: true });
        const { value, error } = schema.validate(req.body);

        if (error !== undefined) {
            return sendResponse(res, false, 422, error.details[0].message);
        }

        // set the variable in the request for validated data
        req.validated = value;
        next();
    } catch (err) {
        next(err);
    }
};

const addToCartValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            restaurantId: Joi.required(),
            dishId: Joi.required(),
            quantity: Joi.required()
        }).options({ allowUnknown: true });
        const { value, error } = schema.validate(req.body);

        if (error !== undefined) {
            return sendResponse(res, false, 422, error.details[0].message);
        }

        // set the variable in the request for validated data
        req.validated = value;
        next();
    } catch (err) {
        next(err)
    }
};




module.exports = {
    restaurantValidation,
    addToCartValidation,
    addDishValidation
};