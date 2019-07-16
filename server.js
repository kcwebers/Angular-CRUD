// ========================== 
// Require the Express Module
// ========================== 
var express = require('express');
var app = express();
// ========================== 
// Require body-parser (to receive post data from clients)copy
// ========================== 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// ========================== 
// Require mongoose
// ========================== 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_tasks');
// ========================== 
// Require path
// ========================== 
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// ========================== 
// Setting our Server to Listen on Port: 8000
// ========================== 
app.listen(8000, function() {
  console.log("listening on port 8000")
});
// ==========================
// Use Angular App
// ==========================
app.use(express.static( __dirname + '/public/dist/public' ));
// ========================== 
// Schemas
// ========================== 
const Schema = mongoose.Schema;
var TaskSchema = new mongoose.Schema({
    "name": {type: String},
    "task": {type: String, required: true},
    "description": {type: String, default: ''},
    "completed": {type: Boolean, default: false}
}, {timestamps: true});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
module.exports = { Task }
// ========================== 
// Routes
// ========================== 

// Get All (Read)
app.get('/tasks', (req, res) => {
  Task.find({}, (err, data) => {
    if(err) {
      console.log("Error!", err);
      res.json({message: "Error", errors : err });
    } else {
      console.log(data)
      res.json({message: "Success", data : data})
    }
  })
  console.log('Looking for Tasks, please hold');
})
// Get One (Read)
app.get('/tasks/:id', (req, res) => {
  var id = req.params.id
  Task.findOne({_id: id}, (err, data) => {
    if(err) {
      console.log("Error!", err);
      res.json({message: "Error", errors : err });
    } else {
      res.json({message: "Success", data : data})
    }
  })
  console.log('Looking for Tasks, please hold');
})
// Create New (Create)
app.post('/tasks', (req, res) => {
    Task.create(req.body, (err, newTask) => {
      if(err) {
        console.log("Error!", err);
        res.json({message:"Error", errors : err})
      } else {
        res.json({message: "Success", data : newTask})
      }
      console.log("Adding task, please hold")
    });
  });
// Update One (Update)
app.put('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({_id: req.params.id}, req.body, (err, task) => {
      if(err) {
        console.log("Error!", err);
        res.json({message: "Error", errors : err});
      } else {
        res.json({message: "Success", data : task})
      }
    })
    console.log('Looking for Tasks, please hold');
})
// Delete One (Delete) 
app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({_id: req.params.id}, (err, task) => {
      if(err) {
        console.log("Error!", err);
        res.json({message: "Error", errors : err});
      } else {
        res.json({message: "Success", data : task})
      }
    })
    console.log('Looking for Tasks, please hold');
})
