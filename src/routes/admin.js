const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './src/public/uploads/admin' });
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/profile', adminController.profile)
router.get('/change-password', adminController.changePassword)

router.put('/edit',upload.single('image'), adminController.edit)

router.patch('/edit-password', adminController.editPassword)

module.exports = router;
