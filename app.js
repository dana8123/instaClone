const express = require("express");
const { postRouter, commentRouter } = require("./routes/Routes");
const mongoose = require("mongoose");
const connect = require('./model');
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: '*',
  credentials: true,
};
// token이나 세션으로 별도의 인증 /

app.use(cors(corsOptions));
connect();

// cors 특정해야하는 부분 해결
// app.use(cors({ origin: "*" }));
//
//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('public/static'));

// 태진 파일 연결은 모두 /api로
const instaRouter = require("./routes/instaRoutes");
app.use("/api", [instaRouter]);

//Router middlewares
app.use(postRouter);
app.use(commentRouter);

app.listen(3000, () => {
  console.log(`서버가 연결되었습니다.`);
});