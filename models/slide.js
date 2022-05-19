const mongoose = require('mongoose');
//User schema
const SlideSchema = new mongoose.Schema({
    slideImage:{type:String,required:true},
    slideUploadDate:{type:Date},
    slideEXPDate:{type:Date}
    },
    {collection:'slides'}
)

const model = mongoose.model('SlideSchema', SlideSchema);

module.exports = model;