const Message = require("./model");
const db = require("mongoose");
const config = require("../../config");
const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
const Model = require("./model");

db.promise = global.promise;
db.connect(MONGO_URI, { useNewUrlParser: true });
console.log("MongoDB connected");

function addMessage(message) {
    const newMessage = new Message(message);
    return newMessage.save();
};

async function getMessages() {
   const messages = await Message.find();
    return messages; 
}

module.exports = {
    add: addMessage,
    list: getMessages
};