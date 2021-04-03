const express = require("express");
const { postUpload, getUpload } = require("../controller/postController.js");
const postRouter = express.Router();


postRouter.get('/upload', getUpload);
postRouter.get('/upload', postUpload);
//postRouter.get('/detail/:id', detail);
//postRouter.get('/detail/:id/edit', getEditWrite);
//postRouter.update('/detail/:id/edit', postEditWrite);
//postRouter.delete('/detail/:id/delete', deleteWrite);

module.exports = { postRouter };
