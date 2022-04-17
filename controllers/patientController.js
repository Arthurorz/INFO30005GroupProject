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

async function addPatient(first_name, last_name, email, password, screen_name, yearofbirth, height, brief_bio, engagement, photo){
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
                photo: photo
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

async function addRecord(patientId){
    try{
        const result = await Record.findOne({
            _id:patientId,
            recordDate:formatDate(new Date())
        });
        if(!result){
            const record = new Record({
                _id: patientId,
                recordDate: formatDate(new Date())
            });

            await record.save();
            return record.id;
        }else{
            return result.id;
        }
    }catch(err){
        console.log("error in addRecord:", err);
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


const renderRecordData = async (req,res) => {
    try{
        const patient = await Patient.findById(req.params.id).lean();
        const record = await Record.findOne({
            _id:patient.id,
            recordDate:formatDate(new Date())
        }).lean();
        console.log(record);
        res.render("",{data:patient, record:record});//render 某个hbs
    }catch(err){
        res.status(400);
        res.send("error happened when rendering record data");
    }
}
    

module.exports={
    getAllPatientData,
}