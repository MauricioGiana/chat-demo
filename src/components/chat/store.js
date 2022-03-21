const Model = require("./model");

function addChat(users) {
    const newChat = new Model(users);
    return newChat.save();
};

function getChats(userId) {
    return new Promise((resolve, reject) => {
        const filter = userId ? { users: userId } : {};
        const messages = Model.find(filter)
            .populate('users')
            .exec((err, populated) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(populated);
                }
            });
    })
}

module.exports = {
    add: addChat,
    list: getChats,
};