const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        default: "",
        trim: true
    },
    description:{
        type:'String',
        default: "",
        trim: true
    },
    cuisines:{
        type:[String],
        default: ["Indian"]
    },
    openTime:{
        type:'String',
        default: "",
        trim: true
    },
    closeTime:{
        type:'String',
        default: "",
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
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    // categoryId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "category",
    // },
},
{
    timestamps: true,
});

const restaurant = mongoose.model('restaurant',userSchema);
module.exports = restaurant;