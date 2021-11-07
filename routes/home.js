const express = require('express');
const router = express.Router();
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const connection = require('../modules/mysql');

router.get('/', async(req, res) => {
    const sql = `SELECT * FROM Post`;
    connection.query(sql, function(err, rows) {
        var resultCode = statusCode.BAD_REQUEST;
        var message = messageCode.POST_FAIL;
        if (err) {
            console.log(err);
            res.status(resultCode).send(message);
        } 
        else {
            resultCode = statusCode.SUCCESS;
            message = messageCode.LIST_SUCCESS;
        }
        res.status(resultCode).json({
            code : resultCode,
            message : message,
            data : rows
        });
    })
})
module.exports = router;