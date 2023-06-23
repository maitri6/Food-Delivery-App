const express = require('express');
const restaurantController = require('../modules/restaurant/resturant.controller');
const router = express.Router();
const {authenticated} = require('../middlewares/authenticated.middleware');

router.post('/addRestaurant',restaurantController.addRestaurant);
router.get('/getRestaurant',authenticated,restaurantController.getRestaurant);
router.get('/getAllCategory',restaurantController.getAllCategory);
router.get('/getAllDish',restaurantController.getAllDish);
router.post('/addDish',restaurantController.addDish);
router.post('/updateDishDetails',restaurantController.updateDishDetails);
router.get('/getAllDish',restaurantController.getAllDish);
router.post('/deleteDishFromRestaurant',restaurantController.deleteDishFromRestaurant);
router.get('/getAllRestaurantFromCategory',restaurantController.getAllRestaurantFromCategory);

module.exports = router;


