const mongoose = require('mongoose');
const URL = `mongodb+srv://sac6969:sac6969@cluster0.lsq3rrg.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.connect('mongodb://127.0.0.1/Habit-Tracker');

mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to MongoDb'));

db.once('open',function(){
    console.log('Connected to Database :: mongoDB');
})

module.exports = db;