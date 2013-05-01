var http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    mongoose = require('mongoose'),
    mongoClientReq = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
    mongoose.connect('mongodb://localhost/test');

var TaskModel = mongoose.model('Task', {number: Number, description: String, categories: [String]});
function createMongoConnection(callback) {
    var mongoClient = new mongoClientReq(new Server ('localhost',27017));
        mongoClient.open(function (error, mongoClient){
        if (error) throw error;
        console.log("Opened connection to mongodb");
        var db1 = mongoClient.db("todo");
        console.log("Set db to todo");
        db1.createCollection('todos', function(err, collection){
            if (err) throw err;
            callback(mongoClient,db1,collection);
        });  
    });
}

function constructJSONFromCommand(input, callback) {
    var jsonObject = {};
    jsonObject["number"] = input.body.number;
    jsonObject["description"] = input.body.description;
    jsonObject["categories"] = input.body.categories;
    callback(jsonObject);
}

function createTestTask(callback){
    var testTask = new TaskModel;
    testTask.number = 1;
    testTask.description = "something I have to do";
    testTask.catgegories = ["default"];
    callback(testTask);
}

app.configure(function (){
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
});

app.post("/newTask", function(req,res) {
    //create mongo doc from parsed response
    constructJSONFromCommand(req, function(response) { 
        createMongoConnection(function (mongoClient) {
            mongoClient.db.collection.insert(response);
        });
    });
    
});

app.get("/getData", function (req, res) {
    //construct JSON for response
    constructJSONFromMongo(function (response) {
        
    });
    //we load this each pageload to check the db
    
});



    
    

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
}).listen(3000);

console.log('Server running on port 3000');

createMongoConnection(function (mongoClient, db1, collectionToUse){
    db1.collections(function (err, res) {
        if(err){console.log("Error : " + err);}
        db1.collections(function (err, res) {
            console.log("The following is a list of collections." + '\n');
            for(var i = 0; i < res.length; i++) {
                console.log(res[i]);
            }
            createTestTask(function (task){
                console.log(task);
            });
             console.log("Now inserting a test document");
             collectionToUse.insert({name:"bob",age:"42"}, function (err, records){
                console.log("Test document inserted with ID: " + records[0]._id);
            });
                
        });
    });
});