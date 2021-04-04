const express = require("express");
const { postUpload, detail, postEdit, deletePost } = require("../controller/postController.js");
const postRouter = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public' })

postRouter.post('/upload', upload.array('file'), postUpload);
postRouter.post('/detail/:id', detail);
postRouter.post('/detail/:id/edit', postEdit);
postRouter.post('/detail/:id/edit', postEdit);
postRouter.delete('/detail/:id/delete', deletePost);

module.exports = { postRouter };
