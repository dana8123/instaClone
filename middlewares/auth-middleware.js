const jwt = require("jsonwebtoken");
const User = require("../model/user");


//사용자 인증 미들웨어

module.exports = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능합니다.",
        });
        return;
    } try {
        const { userId } = jwt.verify(token, "team2-key");
        User.findById(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "사용자 인증에 실패했습니다.",
        });
    }
};