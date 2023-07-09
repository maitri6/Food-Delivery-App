const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        default: "",
        trim: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

},
{
    timestamps: true,
});



const category = mongoose.model('category',userSchema);
module.exports = category;