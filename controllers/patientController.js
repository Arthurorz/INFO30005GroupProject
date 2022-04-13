//用不了
const Patient = require('../models/patient.js');

const getAllPatientData = async(req, res, next) => {
    try{
        const patients = await Patient.find().lean()
        return res.render('allData',{data:patients})
    }catch(err){
        return next(err)
    }
}

module.exports={
    getAllPatientData,
}