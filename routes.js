const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const stonesController = require('./controllers/stoneController');

router.use(homeController);
router.use('/auth', authController);
router.use('/stones', stonesController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;