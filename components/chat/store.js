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

async function updateMessage(id, message) {
    const result = await Message.findByIdAndUpdate(id, { message });
    const updatedMessage = await Message.findById(id);
    return updatedMessage;
}

async function deleteMessage(id) {
    const result = await Message.findByIdAndRemove(id);
    return result;
}

module.exports = {
    add: addUser,
    list: getUsers,
};