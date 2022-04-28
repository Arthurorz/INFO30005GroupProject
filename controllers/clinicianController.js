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
        
        res.render('clinician-individualData.hbs',{layout: 'clinician.hbs', patient:patient});
    }catch(err){
        console.log(err)
    }
}

const renderDashboard = async (req, res) => {
    try{
        const clinicianID = "626392e9a4d69d527a31780f";
        const patients = (await Clinician.findById(clinicianID).populate({
            path:'patients',
            options:{lean:true},
            populate:{
                path:'patient_id',
                options:{lean:true},
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
            initialRecord(patients[i].patient_id);
            const patient = patients[i].patient_id;
            for(j in patient.records){
                const record = patient.records[j].record_id;
                if (record.date == (new Date()).toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})){
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

async function initialRecord (patient_id){
    try{
        const patient = await Patient.findById(patient_id);
        const record = await Record.findOne({patientId: patient._id, date:(new Date()).toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})});
        if(record == null){
            const newRecord = new Record({
                patientId: patient._id,
                date: (new Date()).toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"}),
            });
            if(!patient.require_data.glucose){
                newRecord.data.glucose.status = "Not required";
            }
            if(!patient.require_data.weight){
                newRecord.data.weight.status = "Not required";
            }
            if(!patient.require_data.exercise){
                newRecord.data.exercise.status = "Not required";
            }
            if(!patient.require_data.insulin){
                newRecord.data.insulin.status = "Not required";
            }
            await newRecord.save();
            patient.records.push({record_id:newRecord._id});
            await patient.save();
        }else{
            console.log("record already exists");
        }


    }catch(err){
        console.log(err);
    }
}

/* have problem in this function    */
const searchDashboard = async (req, res) => {
    try{
        if (req.body.patientName==''){
            renderDashboard(req,res);
        }else{
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
            const patientList = []
            for(i in patients){
                if (patients[i].patient_id.first_name==(req.body.patientName)){
                    const patient = patients[i].patient_id;
                    for(j in patient.records){
                        const record = patient.records[j].record_id;
                        if (record.date == (new Date()).toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})){
                            patientList.push({
                                patient_id: patient._id,
                                first_name: patient.first_name,
                                bound:patient.bound,
                                today_record: record,
                            });
                        }
                    }
                }
            }
            
            res.render('clinician-dashboard.hbs',{layout:'clinician.hbs',patients:patientList});
            
        }
    }catch(err){
        console.log(err)
    }
}


module.exports={
    renderDashboard,
    renderClinicianData,
    addPatient,
    renderPatientData,
    searchDashboard,

}
