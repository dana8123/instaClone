const express = require("express");
const { postUpload,
    detail,
    postEdit,
    deletePost } = require("../controller/postController.js");
const { commentUpload,
    commentDelete,
    commentEdit,
    comment } = require("../controller/commentController.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const multer = require('multer');
const upload = multer({ dest: 'public' })
const postRouter = express.Router();
const commentRouter = express.Router();



postRouter.post('/upload', authMiddleware ,upload.array('file'), postUpload);
postRouter.post('/detail/:id', detail);
postRouter.put('/detail/:id/edit', postEdit);
postRouter.delete('/detail/:id/delete', deletePost);

commentRouter.post('api/add_comment', authMiddleware, commentUpload);
commentRouter.get('api/set_comment', comment);
commentRouter.put('/:id/comment/edit', commentEdit);
commentRouter.delete('/:id/comment/delete', commentDelete);

module.exports = { postRouter, commentRouter };
