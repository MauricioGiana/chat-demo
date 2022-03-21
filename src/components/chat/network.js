const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get("/", (req, res) => {
    controller.getChats()
        .then(chats => {
            response.success(req, res, chats);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.get("/:userId", (req, res) => {
    const {userId} = req.params;
    if (!userId) return Promise.reject("Invalid user id");
    controller.getChats(userId)
        .then(chats => {
            response.success(req, res, chats);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.post("/", (req, res) => {
    const { users } = req.body;
    controller.addChat(users)
        .then(newChat => {
            response.success(req, res, newChat, 201);
        })
        .catch(err => {
            response.error(req, res, "Internal error", 500, err);
        });
});

module.exports = router;