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
    },
    price:{
        type: Number,
        default: "",
        trim: true,
    },
    restaurantId: {
        type: mongoose.Types.ObjectId,
        ref: "restaurant",
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category",
    },
},
{
    timestamps: true,
});


const dishes = mongoose.model('dishes',userSchema);
module.exports = dishes;