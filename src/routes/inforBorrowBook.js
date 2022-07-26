const express = require('express');

const router = express.Router();

const inforBorrowBookController = require('../app/controllers/InforBorrowBookControllder');

router.get('/show', inforBorrowBookController.show);

module.exports = router;