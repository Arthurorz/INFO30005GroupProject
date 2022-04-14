// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ZhikaiWu:wzk13579wasd@weballgood.4a1d3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    dbName:"weballgood"
    })
    .then(()=> console.log("Connected to mongodb"))
    .catch((err)=> console.log(err, "Error connecting to mongodb"));