const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './src/public/uploads/books' });
const router = express.Router();

const bookController = require('../app/controllers/BookController');

router.get('/create', bookController.create);
router.get('/show', bookController.show);
router.get('/:id/edit', bookController.edit);

router.post('/store', upload.single('image'), bookController.store);

router.put('/:id',upload.single('image'), bookController.update);

router.delete('/:id', bookController.delete);

module.exports = router;
