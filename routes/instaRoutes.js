const express = require("express");
const User = require("../model/user");
const Post = require("../model/post");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");
const bcrypt = require("bcrypt");
const fs = require('fs');
const { response } = require('express');
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(cors({ origin: "*" }));

//회원가입
router.post("/register", async (req, res) => {
    try {
        const { insta_Id, name, password } = req.body;

        const existUsers = await User.findOne({ insta_Id: insta_Id });
        console.log(existUsers)

        if (existUsers !== null) {
            res.status(400).send({
                errorMessage: "이미 가입된 아이디 또는 닉네임이 있습니다.",
            });
            return;
        };

        let friend_list = [name]

        await User.create({
            insta_Id,
            name,
            friend_list,
            password: bcrypt.hashSync(password, 10),
        })
        res.send("성공입니다 ^^ 잘난척 금지")
    }
    catch (err) {
        console.log(err);
        res.status(400).send({

            errorMessage: "양식을 맞춰주세용!",

        });
    };
});

// 로그인 jwt
router.post("/login", async (req, res) => {
    console.log("여기가 리퀘바디 =============")
    console.log(req.body)
    console.log("로그인 시작")
    try {
        const { insta_Id, password } = req.body;
        const user = await User.findOne({ insta_Id }).exec();
        bcrypt.compare(password, user["password"], (err, same) => { // 비밀번호 일치 확인
            if (same) {
                const token = jwt.sign({ userId: user.userId }, "team2-key");
                res.send({
                    token,
                });
            } else {
                res.status(400).send({
                    errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
                });
                return;
            }
        })
    } catch (err) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드의 형식이 올바르지 않습니다."
        });
    }
});

// jwt로그인 실험용
router.post("/test", async (req, res) => {

    const token = req.body.token;

    payload = jwt.verify(token, "team2-key");
    const { name } = await User.findOne({ _id: payload.userId })
    const { insta_Id } = await User.findOne({ _id: payload.userId })

    console.log("==== 토큰 =====")
    console.log(token)
    console.log("==== 이름 =====")
    console.log(name)
    console.log("==== 아이디 =====")
    console.log(insta_Id)

    res.json({
        name: name,
        insta_Id: insta_Id,
    })

    console.log("==== 끝 =====")
});

// 친구 추천 보여주기
router.post("/friend_list", async (req, res) => {

    const { token } = req.headers;
    payload = jwt.verify(token, "team2-key");
    const { name } = await User.findOne({ _id: payload.userId })

    // let my_nick = []
    // friend_my_Id_save = await User.findOne({ nickname: nickname });
    // my_nick.push(friend_my_Id_save)
    // await User.deleteOne({ nickname: nickname })

    friend_Id = await User.find({})
    res.json({ friend_list: friend_Id });
});

// 친구 추가하기
router.post("/add_friend", async (req, res, next) => {
    console.log('== 친구 추가 발동! ==')
    const add_friend_name = req.body.name;
    console.log(add_friend_name)
    const { token } = req.headers;

    payload = jwt.verify(token, "team2-key");
    let { friend_list } = await User.findOne({ _id: payload.userId })
    const { name } = await User.findOne({ _id: payload.userId })

    if (friend_list.includes(add_friend_name) == true) {
        res.send("이미 친구랍니다^^")
        return
    }
    friend_list.push(add_friend_name)

    await User.updateOne({ name }, { $set: { friend_list } });
    res.send("친구 추가 완료 ^^")
});

// 친구 삭제하기
router.post("/delete_friend", async (req, res, next) => {
    console.log('== 친구 삭제 발동! ==')

    const friend_nickname = req.body.nickname;
    const { token } = req.headers;

    payload = jwt.verify(token, "team2-key");
    let { friend_list } = await User.findOne({ _id: payload.userId });
    const { nickname } = await User.findOne({ _id: payload.userId });

    // 배열 삭제
    console.log(friend_nickname)
    friend_list.splice(friend_list.indexOf(friend_nickname), 1);
    console.log(friend_list)
    await User.updateOne({ nickname: nickname }, { $set: { friend_list } });
});

// 내 친구 목록 보여주기
router.get("/my_friend_list_show", async (req, res) => {
    const { token } = req.headers;
    payload = jwt.verify(token, "team2-key");
    const { friend_list } = await User.findOne({ _id: payload.userId })
    const { name } = await User.findOne({ _id: payload.userId })
    res.json({ my_friend_list_show: friend_list });
    console.log(" == 친구목록 확인 완료 ^^ ==")
});

// // 게시글 저장하기
// router.post("/write", async (req, res, next) => {
//     console.log("발동중")
//     const board_show = req.body.board;
//     const { token } = req.headers;

//     payload = jwt.verify(token, "team2-key");
//     const { nickname } = await User.findOne({ _id: payload.userId })

//     let like_user = []
//     let like_count = 0

//     let board_Id = 0
//     let data = await Board.find({}).sort("-board_Id")

//     if (data.length == 0) { post_Id = 1 }
//     else { post_Id = data[0]["post _Id"] + 1 }

//     await Board.create({
//         board_Id,
//         board_show,
//         nickname,
//         like_user,
//         like_count,
//     })
// });

// 메인 피드 보여주기 게시글 보여주기
router.post("/show", async (req, res) => {

    console.log("==== /api/show ====")
    const { token } = req.headers;
    const post_list = await Post.find({});

    payload = jwt.verify(token, "team2-key");
    const { friend_list } = await User.findOne({ _id: payload.userId })
    const { name } = await User.findOne({ _id: payload.userId })
    const { insta_Id } = await User.findOne({ _id: payload.userId })

    const existUsers = await User.findOne({ insta_Id: insta_Id });

    // 접속한 사람의 친구목록을 받아온 후
    // for문을 돌려서 post의 name이 포함되어있는지 확인 후
    // 있는 것만 배열에 넣고 전송하기

    res.send({
        post_list: post_list, name: name
    })
});

// 상세 게시글 보여주기
router.post("/show_board_detail/:instaId", async (req, res) => {
    const { instaId } = req.params;
    console.log(instaId)
    const board_list = await Board.findOne({ board_Id: instaId });
    console.log(board_list)

    res.json({ board_list: board_list });

});

// 좋아요
router.post("/like", async (req, res) => {
    const { post_Id } = req.body;
    const { token } = req.headers;

    payload = jwt.verify(token, "team2-key");
    const { name } = await User.findOne({ _id: payload.userId });

    let { like_user } = await Post.findOne({ post_Id: post_Id })
    let { like_count } = await Post.findOne({ post_Id: post_Id })

    if (like_user.includes(name) == true) {
        like_count = like_count -= 1

        like_user.splice(like_user.indexOf(name), 1);
        await Post.updateOne({ post_Id }, { $set: { like_user, like_count } });
        res.send("이미 좋아요했으니 취소!")
        return
    }
    if (like_user.includes(name) == false) {
        like_count = like_count += 1
        like_user.push(name)
        await Post.updateOne({ post_Id }, { $set: { like_user, like_count } });
        res.send("좋아요 성공~")
    }
});

module.exports = router;