const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    restaurantId: {
        type: mongoose.Types.ObjectId,
        ref: "restaurant",
    },
    dishes:[
        {
            dishId: {
                type: mongoose.Types.ObjectId,
                ref: "dishes",
            },
            quantity:{
                type:'Number'
            },
            totalPrice:{
                type:'Number'
            }

        },
    ],
 
   
    grandTotal:{
        type:'Number'
    },
},
    {
        timestamps: true,
    });

const cart = mongoose.model('cart',userSchema);
module.exports = cart;