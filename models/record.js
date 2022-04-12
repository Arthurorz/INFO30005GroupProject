const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    patientid: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    glucose: {
        status: {type: String, enum:["recorded", "unrecorded", "Not required"], default:"Unrecorded"},
        value: {type: Number, default: 0},
        comment: {type: String, default: ""},
        date: {type: Date, default: null},
    },
    weight: {
        status: {type: String, enum:["recorded", "unrecorded", "Not required"], default:"Unrecorded"},
        value: {type: Number, default: 0},
        comment: {type: String, default: ""},
        date: {type: Date, default: null},
    },
    exercise: {
        status: {type: String, enum:["recorded", "unrecorded", "Not required"], default:"Unrecorded"},
        value: {type: Number, default: 0},
        comment: {type: String, default: ""},
        date: {type: Date, default: null},
    },
    insulin: {
        status: {type: String, enum:["recorded", "unrecorded", "Not required"], default:"Unrecorded"},
        value: {type: Number, default: 0},
        comment: {type: String, default: ""},
        date: {type: Date, default: null},
    },
    date: {type: Date, default: null, required: true},
})

const Record = mongoose.model('Record', schema);
module.exports = Record;