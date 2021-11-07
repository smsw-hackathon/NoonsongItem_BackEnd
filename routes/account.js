const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');

// 회원가입
router.post('/signup', async(req, res) => {
    const { nickname, email, pw } = req.body;
    if (!email || !pw || !nickname) {
        return res.status(statusCode.BAD_REQUEST).send(messageCode.MISS_DATA);
    } //클라이언트 측에서 누락된 정보가 있는 경우

    const hash = await bcrypt.hash(pw, 12);
    const sql = `INSERT INTO User (nickname, email, pw) VALUES ('${nickname}', '${email}', '${hash}')`;    
    connection.query(sql, function (err, result) {
        var resultCode = statusCode.BAD_REQUEST;
        var message = messageCode.SIGN_UP_FAIL;

        if (err) {
            console.log(err);
            return res.status(resultCode).send(message);
        } else {
            resultCode = statusCode.SUCCESS;
            message = messageCode.SIGN_UP_SUCCESS;
        }

        return res.status(resultCode).json({
            code : resultCode,
            message : message,
        });
    });
});

//로그인
router.post('/signin', async(req, res) => {
    const { email, pw } = req.body;
    if (!email || !pw) {
        return res.status(statusCode.BAD_REQUEST).send(messageCode.MISS_DATA);
    } // 클라이언트 측에서 누락된 정보가 있는 경우.

    const sql = `SELECT * FROM User WHERE User.email = "${email}"`; 
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return res.status(statusCode.NOT_FOUND).send(messageCode.REQUEST_FAIL);
        }
        else {
            if (rows.length === 0) {
                return res.status(statusCode.MATCH_ERR).send(messageCode.INVALID_USER);
            }
            else { 
                const match = bcrypt.compare(pw, rows[0].pw);
                if (!match) {
                    return res.status(statusCode.MATCH_ERR).send(messageCode.INVALID_PW);
                } 
                else {
                    var token = jwt.sign({
                        email: email
                    }, process.env.JWT_SECRET);

                    return res.status(statusCode.SUCCESS).json({
                        code: statusCode.SUCCESS,
                        message: messageCode.SIGN_IN_SUCCESS,
                        userIdx : rows[0].userid,
                        token: token
                    });                                    
                }
            }
        }
        
    })
})

module.exports = router;