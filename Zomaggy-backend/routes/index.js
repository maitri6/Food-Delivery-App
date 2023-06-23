const router = require('express').Router();

router.use('/auth',require('./auth.route'));
router.use('/restaurant',require('./restaurant.route'));
router.use('/admin',require('./admin.route'));

module.exports = router;

