const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB Congif
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose
 .connect(process.env.DATABASE_URI || db, 
     { 
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true 
    })
 .then(() => console.log("MongoDB connected.."))
 .catch(err => console.log(err));

 //USe routes
 app.use('/api/items', require('./routes/api/items'));
 app.use('/api/users', require('./routes/api/users'));
 
 
 const port = process.env.PORT || 5000;
 app.listen(port, ()=> console.log(`Server started on port ${port} ` ));

