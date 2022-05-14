const mongoose = require('mongoose');
//Concert schema
const ConcertSchema = new mongoose.Schema({
    conName: { type: String, required: true },
    artistName: { type: String, required: true },
    conDate: {
        startDate: { type: String },
        endDate: { type: String }
    },
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