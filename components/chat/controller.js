const store = require('./store');

function addUser(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            console.log("{messageController} There is no user name");
            return reject("Invalid parameters");
        };
        const newUser = {
            name
        }
        store.add(newUser);
        resolve(newUser);
    })
};

function getUsers(id) {
    return new Promise((resolve, reject) => {
        resolve(store.list(id));
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            console.log("{messageController} There is no id or message");
            return reject("Invalid parameters");
        };
        const result = await store.update(id, message);
        resolve(result);
    })
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            console.log("{messageController} There is no id");
            return reject("Invalid parameters");
        };
        const result = await store.delete(id);
        resolve(result);
    })
}

module.exports = {
    addUser,
    getUsers,
    updateMessage,
    deleteMessage
};