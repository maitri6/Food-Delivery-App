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
        // location:{
        //     type:'String',
        //     default: "",
        //     trim: true
        // },
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
        },
        location: {
            type:{
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
                default: [33.924, 38.7336]
            },
        },
        address: {
            city:{
                type: String
            },
            state:{
                type: String
            },
            pinCode:{
                type: Number
            },
        }
    },
    {
        timestamps: true,
    }
);
const user = mongoose.model("user", userSchema);
module.exports = user;