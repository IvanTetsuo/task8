const UserModel = require('../../models/User');

const update = async (req, res) => {
    const {userId} = req.params;
    const {age, name} = req.body;
    const user = await UserModel.updateById(userId, {age, name});
    if (!user) {
        return res.status(404).json({result: false});
    }
    return res.json({user});
}

module.exports = update;