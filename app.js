const express = require("express");
const { postRouter } = require("./routes/Routes");
//const mongoose = require("mongoose");
//const connect = require('./schemas');
const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use('/public', express.static('public'));

//Router middlewares

app.use(postRouter);

//connect();


app.listen(3000, () => {
  console.log(`서버가 연결되었습니다. http://localhost:3000`);
});
