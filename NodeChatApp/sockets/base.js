
var mongo = require('mongodb').MongoClient;

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        
        socket.on('chat', function (msg) {

            mongo.connect(process.env.MongoDbUri, function (err, db) {

                var collection = db.collection('chat messages');
                collection.insert({ content: msg }, function (err, o) {

                    if (err) {
                        console.warn(err.message);
                    } else {
                         console.log("chat message inserted into db: " + msg);
                    }
                });
            });
            
            socket.broadcast.emit('chat', msg);
        });
        
        mongo.connect(process.env.MongoDbUri, function (err, db) {
            var collection = db.collection('chat messages');
            var stream = collection.find().sort().limit(10).stream();
            stream.on('data', function (chat) { socket.emit('chat', chat.content); });
        });
    });
};