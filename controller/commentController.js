const Post = require("../model/post.js");
const User = require("../model/user");
const Comment = require("../model/comment");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//댓글 조회하기는.. 구현하지 않겠습니다. 
//왜냐하면 댓글을 작성하면서 post에 푸시해주거든요..!

//댓글 작성하기
const commentUpload = async (req, res) => {

  const { insta_Id } = res.locals.user;
  const { name } = await User.findOne({ insta_Id });
  const {
    params: { id },
    body: { text }
  } = req;
  const post = await Post.findById(id);

  try {
    const newComment = await Comment.create({
      text: text,
      createAt: moment().format("YYYY년 MM월 DD일 HH:mm"),
      name,
    });
    post.save();
    post.comments.push(newComment.id);


    res.send({ newComment });

  } catch (error) {

    res.status(400).send({
      error: '댓글 작성 중 오류가 발생했습니다.'
    });
    console.log(error);

  }
};

//댓글 수정하기
const commentEdit = async (req, res) => {
  const {
    params: { id },
    body: { text }
  } = req;
  try {

    await Comment.findByIdAndUpdate(id, { text });
    res.send({
      message: '댓글 수정 완료!'
    })

  } catch (error) {

    res.send({
      error: '댓글 수정 중 오류가 발생했습니다.'
    });
    console.log(error);

  }
}

//삭제하기
const commentDelete = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {

    await Comment.findByIdAndDelete(id);
    res.send({
      message: '댓글 삭제 완료!'
    });

  } catch (error) {

    res.send({
      error: '댓글 삭제 중 오류가 발생했습니다.'
    });
    console.log(error);

  }
}


module.exports = { commentDelete, commentEdit, commentUpload };