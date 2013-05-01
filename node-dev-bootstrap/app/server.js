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
        callback(mongoClient);
    });
}

function constructJSONFromCommand(input, callback) {
    var jsonObject = {};
    jsonObject["number"] = input.body.number;
    jsonObject["description"] = input.body.description;
    jsonObject["categories"] = input.body.categories;
    callback(jsonObject);
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