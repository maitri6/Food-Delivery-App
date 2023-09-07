const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        trim: true
    },
    description:{
        type:'String',
    },
    price:{
        type: Number,
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