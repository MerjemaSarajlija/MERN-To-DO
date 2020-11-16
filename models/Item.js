const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required : true
    }, 
    date : {
        type: Date,
        default : Date.now
    },
    phase : {
        type: String,
        default: "to_do"
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);