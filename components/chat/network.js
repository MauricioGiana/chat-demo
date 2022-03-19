const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get("/", (req, res) => {
    controller.getUsers()
        .then(users => {
            response.success(req, res, users);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    controller.getUsers(id)
        .then(user => {
            response.success(req, res, user);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.post("/", (req, res) => {
    const { name } = req.body;
    controller.addUser(name)
        .then(newUser => {
            response.success(req, res, newUser, 201);
        })
        .catch(err => {
            response.error(req, res, "Internal error", 500, err);
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