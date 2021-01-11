const express = require('express');
require('dotenv').config();
const cors = require('cors');

const registerFormRoutes = require('./routes/registerForm');
const records = require('./routes/records');
require('./db');

const PORT = process.env.PORT || 3001;

const server = express();
server.use(express.static('public'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use('/musicRecords' , registerFormRoutes);
server.use('/records' , records);

server.listen(PORT , ()=>{
    console.log(`Server listening in http://localhost:${PORT}`);
})
