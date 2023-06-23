const {authenticated} = require('../middlewares/authenticated.middleware');
const express = require('express');
const router = express.Router();
const adminController = require('../modules/admin/admin.controller');

router.get('/getAllRestaurant',authenticated,adminController.getAllRestaurant);
router.get('/deleteRestaurant',authenticated,adminController.deleteRestaurant);


module.exports = router;