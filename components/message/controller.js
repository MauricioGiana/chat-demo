const store = require('./store');

function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.log("{messageController} There is no user or message");
            return reject("Invalid parameters");
        };
        const fullMessage = {
            user,
            message,
            date: new Date()
        }
        store.add(fullMessage);
        resolve(fullMessage);
    })
};

function getMessages() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
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

module.exports = {
    addMessage,
    getMessages,
    updateMessage
};