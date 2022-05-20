const mongoose = require('mongoose');
//Concert schema
const ConcertSchema = new mongoose.Schema({
    hallName:{ type: String, required: true },
    conName: { type: String, required: true },
    artistName: { type: String, required: true },
    conDate: {type:Date,required:true},
    conTime: {
        startTime: { type: String },
        endTime: { type: String }
    },
    conDescription: { type: String, required: true },
    conPoster: {type:String,required:true}
},
    { collection: 'concerts' }
)

const model = mongoose.model('ConcertSchema', ConcertSchema);

module.exports = model;