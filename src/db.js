const db = require("mongoose");

db.promise = global.promise;

async function connect(URI) {
    await db.connect(URI, { useNewUrlParser: true });
    console.log("MongoDB connected");
}

module.exports = connect;