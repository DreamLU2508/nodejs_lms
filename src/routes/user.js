const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// GET
router.get('/create', userController.create);
router.get('/show', userController.show);
router.get('/status', userController.status);
router.get('/:id/edit', userController.edit);

// POST
router.post('/store', userController.store);

// PUT
router.put('/:id', userController.update);

// DELETE
router.delete('/:id', userController.delete);

// PATCH
router.patch('/:id/activate', userController.activate);
router.patch('/:id/deactivate', userController.deactivate);

module.exports = router;
