const express = require('express');
const router = express.Router();
const authController = require("../modules/userAuth/auth.controller");
const {registerValidation,loginValidation} = require('../validations/auth.validations');
const {authenticated} = require('../middlewares/authenticated.middleware');

router.post('/register',registerValidation,authController.register);
router.post('/login',loginValidation,authController.login);
router.post('/updateProfile',authenticated,authController.updateProfile);
router.get('/logout',authenticated,authController.logout);


module.exports = router;