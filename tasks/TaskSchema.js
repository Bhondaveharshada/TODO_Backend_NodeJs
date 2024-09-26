const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    T_name: {
        type:String,
        required:true
    },
    isCompleted :{
        type:Boolean,
        default:false
    },
});

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task 