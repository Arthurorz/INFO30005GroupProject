const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    first_name: {type:String, required: true, trim: true},
    last_name: {type:String, required: true, trim: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    yearofbirth: {type:String, required: true},
    patients: [{
        patient_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
    }],
    brief_bio: {type:String}
})

const Patient = mongoose.model('Clinician', schema);
module.exports = Clinician;