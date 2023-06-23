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
    location:{
        type:'String',
        default: "",
        trim: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category",
    },
},
{
    timestamps: true,
});

const restaurant = mongoose.model('restaurant',userSchema);
module.exports = restaurant;