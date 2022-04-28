const Patient = require('../models/patient.js');
const Record = require('../models/record.js');
const Clinician = require('../models/clinician.js');

const getAllPatientData = async(req, res, next) => {
    try{
        console.log("getAllPatientData");
        const patients = await Patient.findOne({first_name:'San'}).lean();
        console.log(patients);
        return res.render("patient-homePage.hbs",{layout:'patient.hbs',data:patients})
    }catch(err){
        return next(err)
    }
}

const updateRecord = async(req,res,next) =>{
    try{
        const patient_id = '6263f5d7ef996dcc6dbf10af';
        const type = req.params.type;
        const record = await Record.findOne({patientId: patient_id, date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})});
        record.data[type].status = "recorded";
        record.data[type].value = req.body.addData;
        record.data[type].comment = req.body.addComment;
        record.data[type].date =new Date().toLocaleString("en-AU",{"timeZone":"Australia/Melbourne"});
        await record.save();
        res.redirect('/patient/homepage/'+patient_id);
    }catch(err){
        return next(err);
    }
};


async function initialRecord (patient_id){
    try{
        const patient = await Patient.findOne({ _id: patient_id });
        const record = await Record.findOne({patientId: patient._id, date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})});
        if(record == null){
            const newRecord = new Record({
                patientId: patient_id,
                date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"}),
            })
            if(!patient.required_data.glucose){
                newRecord.data.glucose.status = "Not required";
            }
            if(!patient.required_data.weight){
                newRecord.data.weight.status = "Not required";
            }
            if(!patient.required_data.exercise){
                newRecord.data.exercise.status = "Not required";
            }
            if(!patient.required_data.insulin){
                newRecord.data.insulin.status = "Not required";
            }
            await newRecord.save();  
            patient.records.push({record_id: newRecord._id});
            await patient.save();
        }else{
        }
    }catch(err){
        console.log(err);
    }
};

const renderHomePage = async (req, res, next) => {
    try {
        const id = "6263f5d7ef996dcc6dbf10af";
        initialRecord(id);
        const patient = await Patient.findOne({ _id: id }).lean();
        const clinician = await Clinician.findById(patient.clinician).lean();
        const date = new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"});
        const today = await Record.findOne({date: date}).lean();
        const recent7 = [];
        for(let i=0;i<7;i++){
            const recent7date = new Date(new Date().getTime() - (i*24*60*60*1000)).toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"});       
            recent7.push({
                // only record day and month
                date: recent7date.substring(0,5),
                record: await Record.findOne({date: recent7date}).lean(),
            });
        }
        res.render("patient-homePage.hbs", { layout: 'patient.hbs', patient: patient, clinician: clinician,today: today,recent7: recent7});
    }catch (err) {
        return next(err);
    }
}

const renderAddPage = async (req, res, next) => {
    try{
        const id = "6263f5d7ef996dcc6dbf10af";
        const patient = await Patient.findOne({ _id: id }).lean();
        const type = req.params.type;
        const record = await Record.findOne({patientId: id, date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})}).lean();
        res.render("patient-addData.hbs", { layout: 'patient.hbs', type: type, record: record , patient: patient});
    }catch(err){
         return next(err);
    }
}


module.exports={
    getAllPatientData,
    renderAddPage,
    updateRecord,
    renderHomePage,
}