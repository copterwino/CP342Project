const mongoose = require('mongoose');
//User schema
const HallSchema = new mongoose.Schema({
    hallName: { type: String, required: true, unique: true },
    hallImage:{type:String,required:true}
    },
    {collection:'halls'}
)

const model = mongoose.model('HallSchema', HallSchema);

module.exports = model;