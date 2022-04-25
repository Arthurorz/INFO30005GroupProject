const res = require('express/lib/response');
const Clinician = require('../models/clinician.js');
const Patient = require('../models/patient.js');
const Record = require('../models/record.js');

const addPatient= async(req,res) =>{
    const patient = await Patient.findOne({email:req.params.email})
    if(!patient){
        try{
            const patient = new Patient({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                screen_name: req.body.screen_name,
                yearofbirth: req.body.yearofbirth,
                height: req.body.height,
                brief_bio: req.body.brief_bio,
                engagement: req.body.engagement,
                photo: req.body.photo,
                clinician :req.body.clinician
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

const test = async(req,res) => {
    try{
        const clinicianID = "626392e9a4d69d527a31780f"
        const clinician = await Clinician.findById({clinicianID});
        

    }catch{

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
            path:'records',
            populate:{
                path:'record_id',
                options:{lean:true}
            }}).populate({
                path:'clinician',       
                options:{lean:true}
            }).lean();
        
        const records = patient.records;
        res.render('clinician-individualData.hbs',{layout: 'clinician.hbs', patient:patient, records:records});
    }catch(err){
        console.log(err)
    }
}

const renderDashboard = async (req, res) => {
    try{
        const clinicianID = "626392e9a4d69d527a31780f";
        const patients = (await Clinician.findById(clinicianID).populate({
            path:'patients',
            populate:{
                path:'patient_id',
                populate:{
                    path:'records',
                    options:{lean:true},
                    populate:{
                        path:'record_id',
                        options:{lean:true},
                    }
                }
            }
        }).lean()).patients;
        

        const patientList = [];
        for(i in patients){
            const patient = patients[i].patient_id;
            for(j in patient.records){
                const record = patient.records[j].record_id;
                if (record.date == (new Date()).toDateString()){
                    patientList.push({
                        patient_id: patient._id,
                        first_name: patient.first_name,
                        bound:patient.bound,
                        today_record: record,
                    });
                }
            }
        }
        
        res.render('clinician-dashboard.hbs',{layout:'clinician.hbs',patientList:patientList});
        
    }catch(err){
        console.log(err)
    }
}

const searchDashboard = async (req, res) => {
    try{
        if (req.body.patientName==''){
            renderDashboard(req,res);
        }else{
            const result = await Patient.find({first_name : req.body.patientName}).populate({
                path:'clinician',
                options:{lean:true}
            }).lean().populate({
                path:'records',
                options:{date:formatDate(new Date())}
            });
            console.log(result);
            if(result.length > 0){
                return res.render('clinician-dashboard.hbs',{layout:'clinician.hbs',patients:result});
            }
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
