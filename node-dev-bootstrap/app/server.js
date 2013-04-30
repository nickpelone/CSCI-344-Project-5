var http = require('http'),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    mongoClientReq = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
    mongoose.connect('mongodb://localhost/test');

var TaskModel = mongoose.model('Task', {number: Number, description: String, categories: [String]});
var mongoClient = new mongoClientReq(new Server ('localhost',27017));
mongoClient.open(function (error, mongoClient){
    if (error) throw error;
    console.log("Opened connection to mongodb");
    var db1 = mongoClient.db("todo");
    mongoClient.close(function (error, response){
        if (error) throw error;
        mongoClient.close(function (err){
            if (err) throw err;
            console.log("mongoClient was closed");
        });
    });
});

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