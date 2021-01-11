const mongoose = require('mongoose');
// ///////////////////////////////7
 const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/registerForm';

 mongoose.connect(DB_URL , {
     useNewUrlParser: true,
     useUnifiedTopology: true,
 });