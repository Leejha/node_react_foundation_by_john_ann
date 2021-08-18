const { User } = require('../models/User');

// 왜 토큰을 복호화 한 다음에 유저를 찾지?

let auth = (req, res, next) => {
    let token = req.cookies.x-auth

    User.findByToken(token, (err, user) => {
        if (err) return err;
        if (!user) return res.json({ isAuth : false, error : true})

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };