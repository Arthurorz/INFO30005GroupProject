const res = require('express/lib/response');
const Clinician = require('../models/clinician.js');
const Patient = require('../models/patient.js');
const Record = require('../models/record.js');

const addPatient= async(req,res) =>{
    const patient = await Patient.findOne({email:req.params.email})
    if(!patient){
        try{
            const patient = new Patient({
                first_name: req.params.first_name,
                last_name: req.params.last_name,
                email: req.params.email,
                password: req.params.password,
                screen_name: req.params.screen_name,
                yearofbirth: req.params.yearofbirth,
                height: req.params.height,
                brief_bio: req.params.brief_bio,
                engagement: req.params.engagement,
                photo: req.params.photo,
                clinician :req.params.clinician
            });
            await patient.save();
            console.log("Patient added");
        }catch(err){
            console.log(err);
        }
    }else{
        console.log("Patient already exists\n");
        console.log("Patient id is : ", patient.id);
    }   
}

const renderClinicianData = async (req,res) => {
    try{
        const clinician = await Clinician.findById(req.params.id).lean();
        res.render('',{layout: 'clinician.hbs',clinicianData:clinician});//render 某个hbs
    }catch(err){
        res.status(400);
        res.send("error happened when rendering clinician data");
    }
}
const renderPatientData = async (req,res) => {
    try{
        const patient = await Patient.findOne({_id:req.params.id}).populate({
            path:'clinician',
            options:{lean:true}
        }).lean().populate({
            path:'records',
            options:{lean:true}
        }).lean();
        res.render('clinician-individualData.hbs',{layout: 'clinician.hbs',patientData:patient});
    }catch(err){
        console.log(err)
    }
}

const renderDashboard = async (req, res) => {
    try{
        const patient = await Patient.find(/*{clinician_ID : req.params.clinicianID}*/).populate([{
            path:'records',
            options:{lean:true}
        }]).lean().populate({
            path:'clinician',
            options:{lean:true}
        }).lean();

        console.log(patient);
        if(patient.length > 0){
            return res.render('clinician-dashboard.hbs',{layout:'clinician.hbs',patients:patient});
        }
    }catch(err){
        console.log(err)
    }
}

const searchDashboard = async (req, res) => {
    try{
        const result = await Patient.find({first_name : req.params.patientName}).populate({
            path:'clinician',
            options:{lean:true}
        }).lean().populate({
            path:'records',
            options:{date:formatDate(new Date())}
        });
        console.log(result);
        if(result.length > 0){
            return res.redirect('clinician-dashboard.hbs',{layout:'clinician.hbs',patients:result});
        }
    }catch(err){
        console.log(err)
    }
}

function formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports={
    renderDashboard,
    renderClinicianData,
    addPatient,
    renderPatientData,
    searchDashboard
}
