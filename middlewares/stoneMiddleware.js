const stonesService = require('../services/stonesService');

async function isCourseOwner(req, res, next) {
    const stoneId = req.params.stoneId;
    const stone = await stonesService.getOne(stoneId).lean();

    if (stone.owner != req.user?._id) {
        return res.redirect(`/stones/${stoneId}/details`)
    };
    req.stone = stone;
    next();
};

exports.isCourseOwner = isCourseOwner;