const express = require('express');
const router = express.Router();
const accountRouter = require('./account'); //로그인 라우터
const postRouter = require('./post');

router.post('/signin', accountRouter); //로그인
router.post('/signup', accountRouter); //회원가입
router.post('/post', postRouter);
module.exports = router;