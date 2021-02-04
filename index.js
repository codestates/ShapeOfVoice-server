const express = require('express');
const fs = require('fs');
const https = require('https');
const session = require('express-session');
const cors = require('cors');
const key = fs.readFileSync(__dirname + '/key.pem', 'utf-8');
const cert = fs.readFileSync(__dirname + '/cert.pem', 'utf-8');
const app = express();

const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');
const voiceRouter = require('./routes/voice');
const voice_boardRouter = require('./routes/index');


app.use(
    session({
        secret: '!@#shapeofvoice#@!',
        resave: false,
        saveUninitialized: false,
        cookie: {
            domain: 'localhost',
            path: '/',
            maxAge: 24 * 6 * 60 * 10000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: 'https://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
        credentials: true,
    })
);

app.use('/user', userRouter);
app.use('/board', boardRouter);
app.use('/voice', voiceRouter);
app.use('voice_board', voice_boardRouter);

const httpsServer = https.createServer({ key, cert }, app).listen(4000, () => {
    console.log('server on 4000 port');
});

module.exports = httpsServer;