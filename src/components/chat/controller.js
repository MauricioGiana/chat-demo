const store = require('./store');

function addChat(users) {
    return new Promise((resolve, reject) => {
        if (!users || !Array.isArray(users)) {
            console.log("{messageController} There is no users");
            return reject("Invalid parameters");
        };
        const newChat = {
            users
        }
        store.add(newChat);
        resolve(newChat);
    })
};

function getChats(id) {
    return new Promise((resolve, reject) => {
        resolve(store.list(id));
    })
}

module.exports = {
    addChat,
    getChats
};