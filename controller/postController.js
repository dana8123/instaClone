const Post = require("../model/post.js");

// 글쓰기 
const postUpload = async (req, res) => {
  const {
    body: { file, content }
  } = req;
  try{
      const newPost = await Post.create({
        content,
        file,
      })
      res.redirect(`detail/:${newPost.id}`);
  } catch (error) {
    res.status(400).send({
      error : '업로드하는 중 오류가 발생했습니다.'
      });
    console.log( error );  
  };
};

//upload rendering
const getUpload = async (req, res) => {
  res.send('front end 파일명이 뭐지?');
};



module.exports = { postUpload, getUpload };