const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    clinicianID:{type:mongoose.Schema.Types.ObjectId, ref: 'Clinician',required: true},
    first_name: {type:String, required: true, trim: true},
    last_name: {type:String, required: true, trim: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    screen_name: {type:String, required: true, unique: true},
    yearofbirth: {type:String, required: true},
    height: {type:Number, required: true},
    records: [{
        record_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Record'}
    }],
    brief_bio: {type:String}, 
    engagement:{type:Number, required: true},
    photo:{type:String},
    support_message:{type:String},
    clinician:{clinicianID: {type: mongoose.Schema.Types.ObjectId, ref: 'Clinician'}}
})

//Create collection patients in mongodb
const Patient = mongoose.model('Patient', schema);
module.exports = Patient;