const express = require("express");
const { postRouter } = require("./routes/Routes");
const mongoose = require("mongoose");
const connect = require('./model');
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
connect();

// cors 특정해야하는 부분 해결
// app.use(cors({ origin: "*" }));

//
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('public'));

// 태진 파일 연결은 모두 /api로
const instaRouter = require("./routes/instaRoutes");
app.use("/api", [instaRouter]);

//Router middlewares
app.use(postRouter);
//connect();


// 임시 프론트 // 로그인 후 글쓰기는 ARC로 해결 안되는 듯
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/join', (req, res) => {
  res.render('join')
})
app.get('/home', (req, res) => {
  res.render('home')
})
app.get('/detail', (req, res) => {
  res.render('detail')
})

app.listen(3000, () => {
  console.log(`서버가 연결되었습니다.`);
});