const Task = require("./TaskSchema");
const {model} = require("mongoose");
const express = require("express");

const handleGetAllTask = async (req,res)=>{
    await Task.find().exec()
    .then((result)=>{
        const response = {
            count:result.length,
            Tasks:result.map(task =>{
                return {
                    _id : task._id,
                    taskName:task.T_name,
                    isCompleted:task.isCompleted,
                    
                }
             })
        }
        res.status(200).json({response});
    }).catch((err)=>{
        res.status(500).json({
            error:err
        });
    });
    
};

const handleAddTask = async(req,res,next)=>{

    
    const body = req.body.taskName;
    
    const task = await Task.findOne({T_name:req.body.taskName});

    if(!req.body.taskName){
        return res.status(400).json({
            message:"task field is required"
        })
    }else if(task){
        return res.status(400).json({
            message:"task is already exist in list "
        })
    }
    console.log("After Cond");
    
    const newtask = new Task({
        T_name : req.body.taskName,
        isCompleted : false,
    });
    newtask.save()
    .then(result=>{
        res.status(200).json({
            message:"task Saved Successfully"
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
};

const handleUpdateTask = async(req,res)=>{
    const id = req.params.taskId
    const name = req.body.taskName
    console.log(name);
    
 
    let update = {
        T_name:name
    }

   await Task.updateOne({_id:id},{$set :update})
    .exec()
    .then((result)=>{
        res.status(200).json({
            message:"Task Updated",
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        });
    });
};

const handleTaskStatus= async (req,res)=>{
    console.log(req.params.taskId);
    
    const id = req.params.taskId;
    const iscomplete = req.body.isCompleted;
    const update ={
        isCompleted : iscomplete
    }
 await Task.updateOne({_id:id},{$set :update})
 .exec()
 .then((result)=>{
    res.status(200).json({
        message:"task is complete",
        task_id :result._id
    })
 }).catch((err)=>{
    res.status(500).json({
        error:err
    });
 });

}

const handleDeleteTask = async (req,res)=>{
   const id = req.params.taskId;
   await Task.deleteOne({_id:id})
   .exec()
   .then((result)=>{
    res.status(200).json({
        message:"Task deleted",

    })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
   })

    
}


module.exports = {
    handleGetAllTask,
    handleAddTask,
    handleUpdateTask,
    handleTaskStatus,
    handleDeleteTask
};

