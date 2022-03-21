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


module.exports = {
    addUser,
    getUsers
};