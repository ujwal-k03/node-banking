const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    newbalance: {
        type: Number,
        required: true,
    },
    user2name: {
        type: String,
    }
})

const History = mongoose.model('history', historySchema);
module.exports = History;