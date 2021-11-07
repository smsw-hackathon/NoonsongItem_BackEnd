const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const connection = require('../modules/mysql');

router.post('/post', upload.single('image'), async(req, res) => {
    const { writer, content, price, productname, min, current, ask, notice, image } = req.body;
    const img = req.file.location; //이미지 경로
    if (!writer || !content || !price || !productname || !min || !current || !ask || !notice) {
        return res.status(statusCode.BAD_REQUEST).send(messageCode.POST_FAIL);
    }

    const sql = `INSERT INTO Post(writer, content, price, product_name, min_requester, cur_requester, qna_link, notice_link, image) 
    VALUES (${writer}, '${content}', ${price}, '${productname}', ${min}, ${current}, '${ask}', '${notice}', '${img}')`;
    connection.query(sql, function(err, rows) {
        var resultCode = statusCode.BAD_REQUEST;
        var message = messageCode.POST_FAIL;
        if (err) {
            console.log(err);
            return res.status(resultCode).send(message);
        } else {
            resultCode = statusCode.SUCCESS;
            message = messageCode.POST_SUCCESS;
        }
        return res.status(resultCode).json({
            code : resultCode,
            message : message,
        });
    })
})
module.exports = router;