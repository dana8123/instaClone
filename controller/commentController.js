const Post = require("../model/post.js");
const User = require("../model/user");
const Comment = require("../model/comment");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//댓글 조회하기
const comment = async (req, res) => {
  const {
    body: { post_Id }
  } = req;

  commentId = await Comments.find({ post_Id: post_Id }).sort("-comment_Id");

  try {
    // const comment = post["comments"]

    // const comments = post.comments
    // console.log(comments)
    res.send({ comments: commentId });

  } catch (error) {
    res.send({
      message: '댓글을 불러오는 중 오류가 발생했습니다.'
    });
    console.log(error);
  }
}

//댓글 작성하기
const commentUpload = async (req, res) => {
  console.log("==댓글 작성==")
  const { insta_Id } = res.locals.user;
  const { name } = await User.findOne({ insta_Id });
  const { profile_img } = await User.findOne({ insta_Id });
  const {
    body: { content, post_Id },
  } = req;


  // 댓글 고유값
  let comment_Id = 0
  let data = await Comment.find({}).sort("-comment_Id")
  if (data.length == 0) { comment_Id = 1 }
  else { comment_Id = data[0]["comment_Id"] + 1 }

  // const post = await Post.findOne({ post_Id: post_Id }).populate('comments');

  const { comments } = await Post.findOne({ post_Id });
  comments.push(comment_Id)
  await Post.updateOne({ post_Id }, { $set: { comments } });

  try {
    const newComment = await Comment.create({
      comment_Id,
      text: content,
      createAt: moment().format("YYYY년 MM월 DD일 HH:mm"),
      insta_Id,
      name,
      post_Id,
      profile_img: profile_img,
    });

    // post.save();
    // post.comments.push(newComment);

    // const comments = post.comments
    // const realTimeComment = comments[comments.length - 1];

    const realTimeComment = await Comment.findOne({ comment_Id: comment_Id })
    res.send({ realTimeComment });

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
    body: { content, post_Id }
  } = req;
  try {
    await Comment.findOneAndUpdate(post_Id, { content })
    res.send({
      message: '댓글 수정 완료!'
    })
  } catch (error) {
    res.send({
      error: '댓글 수정 중 오류가 발생했습니다.'
    });
    console.log(error);
  }
};

//삭제하기
const commentDelete = async (req, res) => {
  const {
    body: { comment_Id, post_Id }
  } = req;
  console.log(req.body)
  try {
    await Comment.deleteOne({ comment_Id: comment_Id });
    let { comments } = await Post.findOne({ post_Id: post_Id });

    console.log("===코멘트 입니다=============================")
    console.log(comments)

    comments.splice(comments.indexOf([comment_Id]), 1);
    await Post.updateOne({ post_Id }, { $set: { comments } });

    res.send({
      message: '삭제완료!'
    });

  } catch (error) {
    res.send({
      error: '댓글 삭제 중 오류가 발생했습니다.'
    });
    console.log(error);
  }
};

module.exports = { commentDelete, commentEdit, commentUpload, comment };