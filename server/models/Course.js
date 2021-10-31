const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema
UserSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('courses', UserSchema);