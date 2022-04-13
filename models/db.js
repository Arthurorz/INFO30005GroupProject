// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://TY:Yutao0524@weballgood.4a1d3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    dbName:"weballgood"
    })
    .then(()=> console.log("Connected to mongodb"))
    .catch((err)=> console.log(err, "Error connecting to mongodb"));