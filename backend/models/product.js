import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
    name:{
        type:String,
        strim:true,
        maxLength:32,
        required:true
    },
    describe:{
        type:String,
        required:true,
        maxLength:2000
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    price:{
        type:String
    }
 

},{timeStamps:true});

module.exports = mongoose.model("Product",productSchema)