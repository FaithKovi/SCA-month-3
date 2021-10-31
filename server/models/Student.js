const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema
UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    courses: [],
    date: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('students', UserSchema);