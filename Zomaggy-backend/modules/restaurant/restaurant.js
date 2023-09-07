const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        trim: true
    },
    description:{
        type:'String',
        trim: true
    },
    openTime:{
        type:'String',
        trim: true
    },
    closeTime:{
        type:'String',
        trim: true
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
    },
},
{
    timestamps: true,
});

const restaurant = mongoose.model('restaurant',userSchema);
module.exports = restaurant;