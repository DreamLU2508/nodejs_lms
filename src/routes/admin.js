const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/uploads/admin')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage });

const adminController = require('../app/controllers/AdminController');

router.get('/profile', adminController.profile);
router.get('/change-password', adminController.changePassword);

router.put('/edit',upload.single('image'), adminController.edit);

router.patch('/edit-password', adminController.updatePassword);

module.exports = router;
