const express = require('express');
const mongoose = require('mongoose');
const config = require('config');



const app = express();

//BodyParser Middleware
app.use(express.json());

//DB Congif
const db = config.get('mongoURI');

//Connect to mongo
mongoose
 .connect(process.env.DATABASE_URI || db, 
     { 
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false 
    })
 .then(() => console.log("MongoDB connected.."))
 .catch(err => console.log(err));

 //USe routes
 app.use('/api/items', require('./routes/api/items'));
 app.use('/api/users', require('./routes/api/users'));
 app.use('/api/auth', require('./routes/api/auth'));

 
 
 const port = process.env.PORT || 5000;
 app.listen(port, ()=> console.log(`Server started on port ${port} ` ));

