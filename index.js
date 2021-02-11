const express = require('express');
const fs = require('fs');
const http = require('http');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(function(req, res, next) {
	var xForwarded = req.get('X-Forwarded-Proto');
	if(xForwarded !== 'https') {
    	res.redirect('https://' + req.get('Host') + req.url);
	}
});

app.use(
  session({
    secret: '!@#shapeofvoice#@!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 6 * 60 * 10000,
      secure: true,
      SameSite: 'none'
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'https://shapeofvoice.ml',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

// routes폴더
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');
const voiceRouter = require('./routes/voice');
const voice_boardRouter = require('./routes/voice_board');

// 해당 엔드포인트로 요청이 올 경우 routes폴더의 각각의 파일로 보내준다.
app.use('/user', userRouter);
app.use('/board', boardRouter);
app.use('/voice', voiceRouter);
app.use('/voice_board', voice_boardRouter);

const httpServer = http.createServer(app).listen(4000, () => {
  console.log('server on 4000 port');
});
module.exports = httpServer;
