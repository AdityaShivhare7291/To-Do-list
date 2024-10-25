const express = require('express');

const router = express.Router();
const taskController = require('../Controllers/taskController.js');

const { authenticateToken } = require('../Middleware/authmiddleware.js');

router.post('/createTask', authenticateToken, taskController.createTask);
router.get('/getRecentTasks', authenticateToken, taskController.getRecentTasks);
router.delete('/deleteTask/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
