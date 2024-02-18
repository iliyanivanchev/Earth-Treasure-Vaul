const stonesService = require('../services/stonesService');

const { isAuth } = require('../middlewares/authMiddlewares');
const { getErrorMessage } = require('../utils/errorUtil');
const { isCourseOwner } = require('../middlewares/stoneMiddleware');

const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('stones/create');
});

router.post('/create', isAuth, async (req, res) => {
    const stonesData = req.body;
    const userId = req.user._id;

    try {
        await stonesService.create(userId, stonesData);
        res.redirect('/stones/dashboard');
    } catch (err) {
        res.render('stones/create', { ...stonesData, error: getErrorMessage(err) });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const stones = await stonesService.getAll().lean();
        res.render('stones/dashboard', { stones });
    } catch (err) {
        res.render('stones/dashboard', { error: getErrorMessage(err) });
    };
});

router.get('/:stoneId/details', async (req, res) => {
    const stoneId = req.params.stoneId;
    try {
        const stone = await stonesService.getOneDetailed(stoneId).lean();

        const likedUsers = stone.likedList.map(user => user.username).join(', ');
        const isOwner = stone.owner && stone.owner._id == req.user?._id;

        const isLiked = stone.likedList.some(user => user._id == req.user?._id);

        res.render('stones/details', { ...stone, likedUsers, isOwner, isLiked });
    } catch (err) {
        res.render(`stones/${stoneId}/details`, { error: getErrorMessage(err) });
    }
});

router.get('/:stoneId/like', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    const userId = req.user._id;

    try {
        await stonesService.like(stoneId, userId);

        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        res.render(`stones/${stoneId}/details`, { error: getErrorMessage(err) });
    }
});

router.get('/:stoneId/edit', isCourseOwner, async (req, res) => {

    res.render('stones/edit', { ...req.stone });
});

router.post('/:stoneId/edit', isCourseOwner, async (req, res) => {
    const stoneData = req.body;
    const stoneId = req.params.stoneId;

    try {
        await stonesService.edit(stoneId, stoneData);

        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        res.render('stones/edit', { ...stoneData, error: getErrorMessage(err) });
    }
});

router.get('/:stoneId/delete', isCourseOwner, async (req, res) => {
    const stoneId = req.params.stoneId;

    try {
        await stonesService.delete(stoneId);

        res.redirect('/stones/dashboard');
    } catch (err) {
        res.render(`stones/${stoneId}/details`, { error: getErrorMessage(err) });
    }
});

module.exports = router;
