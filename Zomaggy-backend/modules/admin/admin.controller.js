const RestaurantModel = require('../restaurant/restaurant');
const sendResponse = require('../../helpers/requestHandler.helper');

exports.getAllRestaurant = async (req, res, next) => {
    try {
        const getRestaurant = await RestaurantModel.find({});
        return sendResponse(res, true, 200, "Restaurant fetched successfully", getRestaurant);
    } catch (err) {
        console.log(err);
    }

};

exports.deleteRestaurant = async (req, res, next) => {
    try {
        const getRestaurant = await RestaurantModel.deleteOne({ _id: req.query._id });
        return sendResponse(res, true, 200, "Restaurant deleted successfully", getRestaurant);
    } catch (err) {
        console.log(err)
    }

};

