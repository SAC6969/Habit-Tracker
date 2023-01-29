const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(express.static("assets"));

app.set('view engine','ejs');
app.set('views','./views')

app.use('/',require('./routes/index'));

app.listen(PORT,function(err){  
    if(err){
        console.log('error in starting server');
        return;
    }
    console.log('Server Started');
})
