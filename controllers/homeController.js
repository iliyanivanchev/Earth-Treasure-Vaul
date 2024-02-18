const router = require('express').Router();
const stonesService = require('../services/stonesService');

router.get('/', async (req, res) => {

    const latestThree = await stonesService.getLatest().lean();

    res.render('home', { latestThree });
});

router.get('/search', async (req, res) => {
    const {name } = req.query;

    try {
    const stones = await stonesService.search(name).lean();

    res.render('search', { stones });
    } catch (err) {
        res.render('search', { error: getErrorMessage(err) });

    }
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;