const mongoose = require('mongoose');
//Order schema
const OrderSchema = new mongoose.Schema({
    username:{ type: String, required: true },
    conName: { type: String, required: true },
    zoneName: { type: String, required: true },
    amount:{type:Number,required:true},
    total:{type:Number,required:true},
    uploadDate: {type:Date,required:true},
    status:{type:String,required:true}
},
    { collection: 'orders' }
)

const model = mongoose.model('OrderSchema', OrderSchema);

module.exports = model;