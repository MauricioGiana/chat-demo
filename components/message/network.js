const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get("/", (req, res) => {
    controller.getMessages()
        .then(messagesList => {
            response.success(req, res, messagesList);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.post("/", (req, res, next) => {
    const { user, message } = req.body;
    controller.addMessage(user, message)
        .then(fullMessage => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(err => {
            response.error(req, res, "Incorrect parameters", 400, err);
        });
});

router.delete("/", (req, res) => {
    res.send("Hello World");
});

module.exports = router;