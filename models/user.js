const mongoose = require('mongoose');
//User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String }
    },
    {collection:'users'}
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;