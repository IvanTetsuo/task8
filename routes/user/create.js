const UserModel = require('../../models/User');

const createUser = async (req, res) => {
    const {age, name} = req.body;
    const user = await UserModel.create({age, name});
    return res.json({user});
}

module.exports = createUser;