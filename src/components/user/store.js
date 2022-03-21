const Model = require("./model");

function addUser(user) {
    const newUser = new Model(user);
    return newUser.save();
};

async function getUsers(id) {
    if (id) {
        return await Model.findById(id);
    } else {
        return await Model.find();
    }
}

module.exports = {
    add: addUser,
    list: getUsers,
};