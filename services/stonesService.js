const Stones = require('../models/Stones');
const User = require('../models/User');

exports.getAll = () => Stones.find();

exports.getOne = (stoneId) => Stones.findById(stoneId);

exports.getOneDetailed = (stoneId) => this.getOne(stoneId).populate('owner').populate('likedList');


exports.getLatest = () => Stones.find().sort({ createdAt: -1 }).limit(3);

exports.create = async (userId, stonesData) => {
    const stoneAdded = await Stones.create({
        owner: userId,
        ...stonesData,
    });

    await User.findByIdAndUpdate(userId, { $push: { stonesAdded: stoneAdded._id } });

    return stoneAdded;
};

exports.delete = (stoneId) => Stones.findByIdAndDelete(stoneId);

exports.edit = (stoneId, stoneData) => Stones.findByIdAndUpdate(stoneId, stoneData, { runValidators: true });

exports.like = async (stoneId, userId) => {

    const stone = await Stones.findById(stoneId);
    const user = await User.findById(userId);

    stone.likedList.push(userId);
    user.likeStones.push(stoneId);

    await stone.save();
    await user.save();
};

exports.search = (name) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    };

    return Stones.find(query);
};