const express = require("express")
const {handleGetAllTask, handleAddTask,handleUpdateTask,handleDeleteTask,handleTaskStatus} =require("./TaskController") 
const router = express.Router();


router.get('/',handleGetAllTask);
router.post('/addTask',handleAddTask);
router.patch('/updateTask/:taskId',handleUpdateTask);
router.delete('/deleteTask/:taskId',handleDeleteTask);
router.patch('/updateStatus/:taskId',handleTaskStatus);


module.exports = router;