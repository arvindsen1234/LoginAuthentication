const express = require("express");
const app = express() ;
require ('dotenv').config();
const bodyparser= require('body-parser');
const cors = require('cors');
const Auth = require('./routes/AuthRouter');
require ('./models/db');

const PORT = process.env.PORT || 8080;
app.get('/ping', (req, res)=>{
    res.send('PONG');
});

app.use(bodyparser.json());
app.use(cors());
app.use('/auth', Auth);
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})