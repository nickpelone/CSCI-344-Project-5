var http = require('http'),
    mongo = require('mongodb'),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

var TaskModel = mongoose.model('Task', {number: Number, description: String, categories: [String]});

var Task1 = new TaskModel;
Task1.number = 1;
Task1.description = "Something I gotta do";
Task1.categories = ["default", "derp"];
Task1.save(function (err,res){
    if (err) throw err;
    console.log("Task1.save returned: " + res);
});

    
    

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
}).listen(3000);

console.log('Server running on port 3000');