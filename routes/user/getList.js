const UserModel = require('../../models/User');

const getList = async (req, res) => {
    const users = await UserModel.getUsersList();
    return res.json({users});
}

module.exports = getList;