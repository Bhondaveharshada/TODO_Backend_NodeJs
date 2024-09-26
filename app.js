const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const taskRouter = require("./tasks/taskroutes")
const {connectMongoDb} = require("./connection")
const cors = require('cors')
const app = express();
const morgan = require("morgan")


connectMongoDb("mongodb://127.0.0.1:27017/Task_ToDo")

app.use(morgan('dav'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization'
 );
 if(req.method ==='OPTIONS'){
  res.header('Access-Control-Allow-Methods','GET, POST, PATCH,PUT, DELETE');
  res.status(200).json({});
 }
 next()
})


app.use("/tasks",taskRouter)


module.exports = app