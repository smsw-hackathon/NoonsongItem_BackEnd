const express = require('express');
const router = express.Router();
const accountRouter = require('./account'); //로그인 라우터

router.get('/signin', accountRouter); //로그인
router.post('/signup', accountRouter); //회원가입
module.exports = router;