const Patient = require('../models/patient.js');
const Record = require('../models/record.js');
const Clinician = require('../models/clinician.js');
const patientRouter = require('../routes/patientRouter.js');

// const getAllPatientData = async(req, res, next) => {
//     try{
//         console.log("getAllPatientData");
//         const patients = await Patient.findOne({first_name:'San'}).lean();
//         console.log(patients);
//         return res.render("patient-homePage.hbs",{layout:'patient.hbs',data:patients})
//     }catch(err){
//         return next(err)
//     }
// }
// /* 存起来 以后可能有用
// var email = document.getElementById("emails").value;
// var password = document.getElementById("pass").value;
// */

// async function addPatient(first_name, last_name, email, password, screen_name, yearofbirth, height, brief_bio, engagement, photo){
//     const patient = await Patient.findOne({email:email})
//     if(!patient){
//         try{
//             const patient = new Patient({
//                 first_name: first_name,
//                 last_name: last_name,
//                 email: email,
//                 password: password,
//                 screen_name: screen_name,
//                 yearofbirth: yearofbirth,
//                 height: height,
//                 brief_bio: brief_bio,
//                 engagement: engagement,
//                 photo: photo
//             });
//             await patient.save();
//             console.log("Patient added");
//         }catch(err){
//             console.log(err);
//         }
//     }else{
//         console.log("Patient already exists\n");
//         console.log("Patient id is : ", patient.id);
//     }   
// }

// async function addRecord(patientId){
//     try{
//         const result = await Record.findOne({
//             _id:patientId,
//             recordDate:formatDate(new Date())
//         });
//         if(!result){
//             const record = new Record({
//                 _id: patientId,
//                 recordDate: formatDate(new Date())
//             });

//             await record.save();
//             return record.id;
//         }else{
//             return result.id;
//         }
//     }catch(err){
//         console.log("error in addRecord:", err);
//     }
// }

// function formatDate(date){
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-');
// }


// const renderRecordData = async (req,res) => {
//     try{
//         const patient = await Patient.findById(req.params.id).lean();
//         const record = await Record.findOne({
//             _id:patient.id,
//             recordDate:formatDate(new Date())
//         }).lean();
//         console.log(record);
//         res.render("",{record:record});//render 某个hbs
//     }catch(err){
//         res.status(400);
//         res.send("error happened when rendering record data");
//     }
// }

const updateRecord = async(req,res) =>{
    try{
        const patient_name = 'San';
        const patientid = await Patient.findOne({first_name:patient_name}).lean();
        const record = await Record.find({_id:patientid.id}).sort({"date":-1}).limit(1).lean();
        console.log("---record---");
        const data = record[req.body.key];
        data.status = "recorded";
        data.value = req.body.value;
        data.comment = req.body.comment;
        data.date = new Date();
        res.redirect('/patient/homePage');
    }catch(err){
        return next(err);
    }
};


const renderHomePage = async (req, res, next) => {
    try {
        console.log("-----------------renderHomePage------------------");
        const name = 'San';
        const patient = await Patient.findOne({ first_name: name }).lean();
        const clinician = await Clinician.findById(patient.clinician_ID).lean();
        const records = await Record.find({ _id: patient.id}).sort({"date":-1}).limit(7).lean();
        const today = records.find(record => record.date.toDateString() === new Date().toDateString());
        res.render("new.hbs", { layout: 'patient.hbs', patient: patient, clinician: clinician, records: records, today:today });
    } catch (err) {
        return next(err);
    }
}

module.exports={
//     getAllPatientData,
//     addPatient,
//     addRecord,
//     renderRecordData
    updateRecord,
    renderHomePage,
}