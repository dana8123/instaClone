const Post = require("../model/post.js");
const User = require("../model/user");
const Comment = require("../model/comment");
const jwt = require("jsonwebtoken");
const moment = require("moment");


//댓글 작성하기
const commentUpload = async(req,res) => {

  const { userId } = res.locals.user;
  const { name } = await User.findOne({ userId });
  const {
    params: {id},
    body: { text }
  } = req;
  const post = await Post.findById(id);

  try{

    const newComment = await Comment.create({
      text,
      createAt : moment().format("YYYY년 MM월 DD일 HH:mm"),
      name,
    });
    post.save();
    post.comments.push(newComment.id);
    res.redirect(`/detail/${post.id}`); 

  } catch (error) {

    res.status(400).send({
      error : '댓글 작성 중 오류가 발생했습니다.'
    });
    console.log(error);

  }
};

//댓글 수정하기
const commentEdit = async(req,res) => {
  const {
    params: {id},
    body: { text }
  } = req;
  try{

    await Comment.findByIdAndUpdate(id, { text });

  } catch(error) {

    res.send({
      error: '댓글 수정 중 오류가 발생했습니다.'
    })
    console.log(error);

  }
}