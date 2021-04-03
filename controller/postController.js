const { findByIdAndDelete } = require("../model/post.js");
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
//TODO : send -> render로 변경하여 응답할 것
const getUpload = async (req, res) => {
  res.send('front end 파일명이 뭐지?');
};

//상세페이지 불러오기
const detail = async (req, res) => {
  const {
    params: {id},
  } = req;
//TODO: detail 페이지 랜더링 파일 수정해야함. 임의로 넣어놓은값임
  try {
    const post = await Post.findById(id).populate('comments');
    res.render(`detail`, { post }); 
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error : '상세페이지를 불러오는 중 오류가 발생했습니다.'
    });
  };
};

// 수정하기
const postEdit = async (req, res) => {
  const {
    params: {id},
    body: { content }
  } = req;
  try{
    if( user === post.author ) {
      await Post.findByIdAndUpdate(id, { content });
    } else{
      console.log( '유저 정보가 불일치하여 수정할 수 없습니다.')
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error : '수정하기에서 오류가 발생했습니다.'
    });
  };
};

//삭제하기
const deletePost = async (req, res) => {
  const {
    params: {id}
  } = req;
  
  try{
    await findByIdAndDelete(id);
    res.redirect('/home');
  } catch(error){
    console.log(error);
    res.status(400).send({
      error : '삭제하기 중 오류가 발생했습니다.'
    });
  };
};


module.exports = { postUpload, getUpload, detail, postEdit, deletePost };