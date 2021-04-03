const express = require("express");
//const { globalRouter } = require("./routes/globalRoute.js");
//const mongoose = require("mongoose");
const connect = require('./schemas');
const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//connect();


app.listen(3000, () => {
  console.log(`서버가 연결되었습니다. http://localhost:3000`);
});
