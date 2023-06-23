const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        default: "",
        trim: true
    },
    restaurantId: {
        type: mongoose.Types.ObjectId,
        ref: "restaurant",
    },

},
{
    timestamps: true,
});



const category = mongoose.model('category',userSchema);
module.exports = category;