const mongoose = require('mongoose');
//Zone schema
const ZoneSchema = new mongoose.Schema({
    hallName:{ type: String, required: true },
    zoneName: { type: String, required: true, unique: true },
    zonePrice:{type:Number,required:true},
    zoneNumberOfSeat:{type:Number,required:true},

    },
    {collection:'zones'}
)

const model = mongoose.model('ZoneSchema', ZoneSchema);

module.exports = model;