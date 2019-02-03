'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Logger = console.log;

const port = 4125;

const app = express();

const Conn = require('./db_config');

const Config = require('./modules/config');


app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/', (req, res)=>{
   res.send("Hello Ecosys!");
})

app.get('/api/find', Config.find)
app.patch('/api/update', Config.update)
 

app.listen(port, () => {
    Conn().then(db=>{
        console.log(' db available for accessing ')
        app.locals.db = db;
        Logger(`Ecosys app is listening at http://localhost:${port}`);
    }).catch(dbErr=>{
        console.log(' db err ', dbErr)
    })
    
});

