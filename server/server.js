// 	import dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
// const SEED = require('./seed');
const keys = require("./config/keys");
// initialize morgan
app.use(morgan('dev'));


//initialize cors 
app.use(cors());


// initialize express.json
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Connect to MongoDB
mongoose.connect(keys.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        // Ensure MongoDB Connection is successful
        const connectionState = mongoose.connection.readyState;
        if (connectionState === 1) {
            console.log('MongoDB Connected');

        } else {
            console.log('MongoDB Failed to connect');
        }
    })
    .catch((err) => {
        console.log(err)
    });
// Initialize server Port
const PORT = process.env.PORT || 8000;

// Require Routes File
require('./src/routes')(app);
// Start Server
app.listen(PORT, () => {
    console.log(`Server  started at http://localhost:${PORT}`);
});
