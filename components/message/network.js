const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get("/", (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
        .then(messagesList => {
            response.success(req, res, messagesList);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.post("/", (req, res) => {
    const { user, message } = req.body;
    controller.addMessage(user, message)
        .then(fullMessage => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(err => {
            response.error(req, res, "Incorrect parameters", 400, err);
        });
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    controller.updateMessage(id, message)
        .then(updatedMessage => {
            response.success(req, res, updatedMessage);
        })
        .catch(err => {
            response.error(req, res, "Incorrect parameters", 400, err);
        });
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    controller.deleteMessage(id)
        .then(deletedMessage => {
            response.success(req, res, deletedMessage);
        })
        .catch(err => {
            response.error(req, res, "Incorrect parameters", 400, err);
        });
});

module.exports = router;