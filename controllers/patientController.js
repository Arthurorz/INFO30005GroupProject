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

const updateRecord = async(req,res,next) =>{
    try{
        console.log("===========updateRecord===========");
        const patient_id = '6263f5d7ef996dcc6dbf10af';
        const type = req.params.type;
        const record = await Record.findOne({patientId: patient_id, date: (new Date()).toDateString()});
        record.data[type].status = "recorded";
        record.data[type].value = req.body.addData;
        record.data[type].comment = req.body.addComment;
        record.data[type].date = new Date().toDateString();
        await record.save();
        res.redirect('/patient/homepage/'+patient_id);
    }catch(err){
        return next(err);
    }
};


async function initialRecord (patient_id){
    try{
        console.log("===========initiate Record===========");
        const patient = await Patient.findOne({ _id: patient_id });
        const record = await Record.findOne({patientId: patient._id, date: (new Date()).toDateString()});
        if(record == null){
            const newRecord = new Record({
                patientId: patient_id,
                date: (new Date()).toDateString(),
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
            console.log("record already exists");
        }
    }catch(err){
        console.log(err);
    }
};

const renderHomePage = async (req, res, next) => {
    try {
        console.log("==============renderHomePage===============");
        const id = "6263f5d7ef996dcc6dbf10af";
        initialRecord(id);
        const patient = await Patient.findOne({ _id: id }).lean();
        const clinician = await Clinician.findById(patient.clinician).lean();
        const records = await Record.find({patientId: id}).sort({"date":-1}).limit(7).lean();
        const newdate = new Date();
        const date = newdate.toDateString();
        const today = await Record.findOne({date: date}).lean();
        res.render("new.hbs", { layout: 'patient.hbs', patient: patient, clinician: clinician, records: records, today: today });
    }catch (err) {
        return next(err);
    }
}

const renderAddPage = async (req, res, next) => {
    try{
        console.log("===========renderAddPage===========");
        const id = "6263f5d7ef996dcc6dbf10af";
        const patient = await Patient.findOne({ _id: id }).lean();
        const type = req.params.type;
        const record = await Record.findOne({patientId: id, date: (new Date()).toDateString()}).lean();
        res.render("patient-addData.hbs", { layout: 'patient.hbs', type: type, record: record , patient: patient});
    }catch(err){
         return next(err);
    }
}


module.exports={
    getAllPatientData,
//     addPatient,
//     addRecord,
//     renderRecordData
    renderAddPage,
    updateRecord,
    renderHomePage,
}