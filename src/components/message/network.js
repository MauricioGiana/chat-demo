const express = require('express');
const router = express.Router();
const multer = require('multer');

const response = require('../../network/response');
const controller = require('./controller');

const upload = multer({ 
    storage: multer.diskStorage({
        destination: "public/uploads",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    dest: 'public/uploads/' 
});

router.get("/", (req, res) => {
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then(messagesList => {
            response.success(req, res, messagesList);
        })
        .catch(err => {
            response.error(req, res, "Unexpected Error", 500, err);
        })
});

router.post("/", upload.single("file"), (req, res) => {
    const { user, message, chat } = req.body;
    controller.addMessage(user, message, chat)
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