const express = require('express');
const router = express.Router();
const homeRouter = require('./home'); //홈 화면
const accountRouter = require('./account'); //로그인 라우터
const postRouter = require('./post');

router.get('/', homeRouter); // 홈 화면
router.post('/signin', accountRouter); //로그인
router.post('/signup', accountRouter); //회원가입
router.post('/post', postRouter); // 글 작성
module.exports = router; 