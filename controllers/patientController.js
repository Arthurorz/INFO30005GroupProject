const Patient = require('../models/patient.js');

const getAllPatientData = async(req, res, next) => {
    try{
        console.log("getAllPatientData");
        const patients = await Patient.find().lean();
        console.log(patients);
        return res.render("normal-landingPage",{data:patients})
    }catch(err){
        return next(err)
    }
}

module.exports={
    getAllPatientData,
}