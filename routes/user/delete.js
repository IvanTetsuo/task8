const UserModel = require('../../models/User');

const deleteUser = async (req, res) => {
    const {userId} = req.params;
    const result = await UserModel.delete(userId);
    return res.json({result});
}

module.exports = deleteUser;