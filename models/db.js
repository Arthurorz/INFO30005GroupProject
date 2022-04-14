// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost",{
    dbName:"weballgood"
    })
    .then(()=> console.log("Connected to mongodb"))
    .catch((err)=> console.log(err, "Error connecting to mongodb"));