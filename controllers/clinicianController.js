const res = require('express/lib/response');
const Clinician = require('../models/clinician.js');

async function addPatient(first_name, last_name, email, password, screen_name, yearofbirth, height, brief_bio, engagement, photo,clinician){
    const patient = await Patient.findOne({email:email})
    if(!patient){
        try{
            const patient = new Patient({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                screen_name: screen_name,
                yearofbirth: yearofbirth,
                height: height,
                brief_bio: brief_bio,
                engagement: engagement,
                photo: photo,
                clinician :clinician
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
        console.log(clinician);
        res.render('clinician-individualData.hbs',{layout: 'clinician.hbs',clinicianData:clinician});//render 某个hbs
    }catch(err){
        res.status(400);
        res.send("error happened when rendering clinician data");
    }
}

async function renderDashboard(clinicianID){
    try{
        const patients = await Patient.find({clinician:clinicianID}).lean();
        res.render('clinician-dashboard.hbs',{layout:'clinician.hbs',patients:patients});
    }catch(err){
        res.status(400);
        res.send("error happened when rendering clinician dashboard");
    }
}


