const express = require('express');

// controller
const controller = require('../controllers/tasks');

// router instantiation 
const router = express.Router();

// routes
router.route('/').get(controller.getAllTasks).post(controller.createTask);
router.route('/:id').get(controller.getTask).patch(controller.updateTask).delete(controller.deleteTask).put(controller.editTask);

// export
module.exports = router;