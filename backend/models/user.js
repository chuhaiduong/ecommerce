import  mongoose  from 'mongoose';
import crypto from 'crypto';
import {v4 as uuidv4} from 'uuid';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:32
    },
    hashed_password:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        trim:true
    },
    salt:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    },
},{timestamps:true})

userSchema.virtual('password')//tao ra fieled ao
   .set(function (password){
       this.salt = uuidv4()
       this.hashed_password = this.encrytPassword(password);      
   })

userSchema.methods={
    authenticate:function(planinText){
        return this.encrytPassword(planinText)===this.hashed_password;
    },
    encrytPassword:function(password){
        if(!password) return'';
        try{
            return crypto
               .createHmac('sha1',this.salt)
               .update('password')
               .digest('hex')

       }catch(error){
           return"";
       }
    }
}


module.exports = mongoose.model("User",userSchema);