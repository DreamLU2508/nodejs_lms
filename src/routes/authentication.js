const express = require('express');
const router = express.Router();

const authenticationController = require('../app/controllers/AuthenticationController');

router.get('/', authenticationController.login);
router.get('/logout', authenticationController.logout);
router.post('/process', authenticationController.process);

module.exports = router;
