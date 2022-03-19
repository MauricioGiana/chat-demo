const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config");
const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

const db = require("./db");

db(MONGO_URI);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require('./network/routes');

router(app);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

app.use("/app", express.static("public"));

app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
})
