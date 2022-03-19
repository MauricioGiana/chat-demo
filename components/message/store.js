const Model = require("./model");

function addMessage(message) {
    const newMessage = new Model(message);
    return newMessage.save();
};

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        const filter = filterUser ? { user: filterUser } : {};
        const messages = Model.find(filter)
            .populate('user')
            .exec((err, populated) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(populated);
                }
            });
    })
}

async function updateMessage(id, message) {
    const result = await Model.findByIdAndUpdate(id, { message });
    const updatedMessage = await Model.findById(id);
    return updatedMessage;
}

async function deleteMessage(id) {
    const result = await Model.findByIdAndRemove(id);
    return result;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage
};