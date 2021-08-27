const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const config = require('./config/key');
const cors = require('cors');
app.use(
    cors({
      origin: true,
      credentials: true
    })
  );

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, 
{ useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})
.then( () => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello_world'));

app.get('/api/hello', (req, res) => {
    res.send('hello')

})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success : false, err})
        return res.status(200).json({ success : true}) 
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({ email : req.body.email }, (err, user) =>{
        if (!user) 
        {
            return res.json({
                loginSuccess : false,
                message : '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }
        else
        {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({ loginSuccess : false, message : '비밀번호가 틀렸습니다.'
                    })
                }
                user.generateToken((err, user) => {     
                    console.log("test");
                    if (err) return res.status(400).send(err);
                    res.cookie('x-auth', user.token).status(200).json({loginSuccess : true, userId : user._id})
                })
            })
        }
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json(
        {
            _id : req.user._id,
            isAdmin : req.user.role === 0 ? false : true,
            isAuth : true,
            email : req.user.email,
            name : req.user.name,
            lastname : req.user.lastname,
            role : req.user.role,
            imalge : req.user.image
        }
    )
    
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
