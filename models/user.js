const mongoose = require('mongoose');
const {v1: uuidv1} = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String, 
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date
});
 //***virtual field***

userSchema.virtual('password')
.set(function(password){
    this._password = password;

    this.salt = uuidv1();

    this.hashed_password = this.encyptPassword(password);
})
.get(function(){
    return this._password;
});

userSchema.methods = {
authenticate: function(plainText){
    return this.encyptPassword(plainText) === this.hashed_password;
},

    encyptPassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    }
};


module.exports = mongoose.model("User", userSchema);