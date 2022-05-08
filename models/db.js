// connect to mongodb
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://ZhikaiWu:wzk35258970@weballgood.4a1d3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    dbName: "weballgood"
})
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.log(err, "Error connecting to mongodb"));

require('./clinician')
require('./patient')