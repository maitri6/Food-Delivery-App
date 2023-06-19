const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name:{
            type:'String',
            default: "",
            trim: true
        },
        email:{
            type:'String',
            default: "",
            trim: true
        },
        phoneNumber:{
            type:'String',
            default: "",
            trim: true
        },
        location:{
            type:'String',
            default: "",
            trim: true
        },
        role:{
            type: String,
            default: "customer"
        },
        otp:{
            type:'String'
        },
        token:{
            type:'String'
        },
        status: {
            type: Boolean,
            default: false,
        } 
    },
    {
        timestamps: true,
    }
);
const user = mongoose.model("user", userSchema);
module.exports = user;