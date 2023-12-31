const express = require('express');
const restaurantController = require('../modules/restaurant/resturant.controller');
const router = express.Router();
const {authenticated} = require('../middlewares/authenticated.middleware');
const {restaurantValidation,addToCartValidation,addDishValidation} = require('../validations/restaurant.validations');

router.post('/addRestaurant',restaurantValidation,restaurantController.addRestaurant);
router.get('/getRestaurant',authenticated,restaurantController.getRestaurant);
router.get('/getAllCategory',restaurantController.getAllCategory);
router.get('/getAllDish',restaurantController.getAllDish);
router.post('/addDish',addDishValidation,restaurantController.addDish);
router.post('/updateDishDetails',restaurantController.updateDishDetails);
router.get('/getAllDish',restaurantController.getAllDish);
router.post('/deleteDishFromRestaurant',restaurantController.deleteDishFromRestaurant);
router.get('/getAllRestaurantFromCategory',restaurantController.getAllRestaurantFromCategory);
router.post('/addToCart',addToCartValidation,authenticated,restaurantController.addToCart);
router.get('/getCart',authenticated,restaurantController.getCart);
router.get('/getOrders',authenticated,restaurantController.getOrders);

module.exports = router;


