const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordsSchema = new Schema (
    {
        record  : { type: String , required:false },
        artist : { type : String , required:true },
        year : { type : Number , required :true },
        style : { type : String , required :true },
        added : { type : Boolean , required :false },
        image : { type : String , required :false },
        url : { type: String , require:true },
        date : { type : Date , default : Date.now() }
    },
    {
        timeStamps : true
    }
)

const Records = mongoose.model('Records' , recordsSchema);
module.exports = Records;