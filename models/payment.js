const mongoose = require('mongoose');
//Order schema
const PaymentSchema = new mongoose.Schema({
    orderID: { type: String, required: true },
    username:{ type: String, required: true },
    refID:{type :String,required: true},
    payDate:{type :Date,required: true},
    payTime:{type :String,required: true},
    uploadDate: {type:Date,required:true},
    status:{type:String,required:true}
},
    { collection: 'payments' }
)

const model = mongoose.model('PaymentSchema', PaymentSchema);

module.exports = model;