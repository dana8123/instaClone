const express = require("express");
const { postUpload, detail, postEdit, deletePost } = require("../controller/postController.js");
const postRouter = express.Router();


postRouter.post('/upload', postUpload);
postRouter.post('/detail/:id', detail);
postRouter.post('/detail/:id/edit', postEdit);
postRouter.post('/detail/:id/edit', postEdit);
postRouter.delete('/detail/:id/delete', deletePost);

module.exports = { postRouter };
