require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 3600;
mongoose.set('strictQuery', true);

console.log(process.env.PORT)
//Connect to MongoDB
connectDB();

app.use(cors())
app.use(express.json()) //Parse json
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/assets/"))
app.use("/api", require('./routes/carsRoutes'))


//Routes
app.get('/api', (req, res) => {
    res.send('Hello world')
})


mongoose.connection
    .once('open', () => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => console.log(`Your port ${PORT}`));
    }
    )
