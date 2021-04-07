const { findByIdAndDelete } = require("../model/post.js");
const Post = require("../model/post.js");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const multer = require('multer')
const upload = multer({ dest: 'public' })

// 글쓰기 post("/upload")
const postUpload = async (req, res) => {
  // const { token } = req.headers;
  // // 글쓴이 이름 파악하기
  // payload = jwt.verify(token, "team2-key");
  // const { name } = await User.findOne({ _id: payload.userId })
  const { insta_Id } = res.locals.user;
  const { profile_img } = await User.findOne({ insta_Id });
  const { name } = await User.findOne({ insta_Id });

  // 파일 이름 저장하기
  let file_names = []

  // try 문써서 사진 바꾸기
  for (value of req.files) {
    console.log()
    file_names.push("http://13.209.10.75/" + value.filename)
  }

  // 좋아요 기초 db넣기
  let like_count = 0;
  let like_user = [];

  // 게시글 고유값
  let post_Id = 0
  let data = await Post.find({}).sort("-post_Id")
  if (data.length == 0) { post_Id = 1 }
  else { post_Id = data[0]["post_Id"] + 1 }

  const {
    body: { content }
  } = req;

  try {
    const newPost = await Post.create({
      post_Id,
      content,
      name,
      file_name: file_names,
      like_user: like_user,
      like_count: like_count,
      createAt: moment().format("YYYY년 MM월 DD일 HH:mm"),
      profile_img
    })

    const post_list = await Post.findOne({ post_Id: post_Id });
    res.send({ post_list: post_list });

  } catch (error) {
    res.status(400).send({
      error: '업로드하는 중 오류가 발생했습니다.'
    });
    console.log(error);
  };
};

//상세페이지 불러오기
const detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  //TODO: detail 페이지 랜더링 파일 수정해야함. 임의로 넣어놓은값임
  try {
    const post = await Post.findById(id).populate('comments');
    res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: '상세페이지를 불러오는 중 오류가 발생했습니다.'
    });
  };
};

// 수정하기
const postEdit = async (req, res) => {
  const { insta_Id } = res.locals.user;
  const {
    body: { content, id, name, file_name }
  } = req;
  try {
    //TODO : Client에서 글쓴이 변수가 뭔지?
    if (insta_Id === name) {
      await Post.findByIdAndUpdate(id, { content, file_name });
      res.send({
        message: '수정완료!'
      })
    } else {
      res.send({
        error: '작성자만 수정할 수 있습니다.'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: '수정하기에서 오류가 발생했습니다.'
    });
  };
};

//삭제하기
const deletePost = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await findByIdAndDelete(id);
    res.send({
      message: '삭제완료!'
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: '삭제하기 중 오류가 발생했습니다.'
    });
  };
};

module.exports = { postUpload, detail, postEdit, deletePost };