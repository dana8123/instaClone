const Post = require("../model/post.js");
const User = require("../model/user");
const Comment = require("../model/comment");
const jwt = require("jsonwebtoken");
const moment = require("moment");


//댓글 조회하기 (get)
// const comment = async (req, res) => {
//   const {
//     params: {id},
//   } = req;
//   try{
//     const comment = await Comment.findById(id);

//   } catch (error) {

//   }

//}

//댓글 작성하기
const commentUpload = async (req, res) => {

  const { insta_Id } = res.locals.user;
  const { name } = await User.findOne({ insta_Id });
  const {
    params: { id },
    body: { content, post_Id },
  } = req;
  console.log("==== 클라이언트가 넘겨주는 값 =====")
  console.log(req.body.post_Id)
  console.log(req.body.content)
  const post = await Post.findOne({ post_Id: post_Id }).populate('comments');


  console.log("==== post 찾은 것 =====")
  console.log(post)

  try {
    const newComment = await Comment.create({
      text: content,
      createAt: moment().format("YYYY년 MM월 DD일 HH:mm"),
      name,
      profile_img: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg"
    });
    post.save();
    post.comments.push(newComment);

    const comments = post.comments
    const realTimeComment = comments[comments.length - 1];
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
      //comment_id로 다시 보내주기.
    });

  } catch (error) {

    res.send({
      error: '댓글 삭제 중 오류가 발생했습니다.'
    });
    console.log(error);

  }
}


module.exports = { commentDelete, commentEdit, commentUpload };