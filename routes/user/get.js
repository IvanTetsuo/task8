const UserModel = require('../../models/User');

const getUser = async (req, res) => {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({result: false});
    }
    return res.json({user});
}

module.exports = getUser;