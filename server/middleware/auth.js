const { User } = require('../models/User');

// 왜 토큰을 복호화 한 다음에 유저를 찾지?

let auth = (req, res, next) => {
    console.log('xauth token : ', req.cookies.x_auth);

    let token = req.cookies.x_auth;
    console.log('token : ', token);

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth : false, error : true})

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };