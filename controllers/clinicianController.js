const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const Clinician = require('../models/clinician.js');
const Patient = require('../models/patient.js');
const Record = require('../models/record.js');

const addNewPatient = async (req, res) => {
    console.log("进来了")
    const patient = await Patient.findOne({ email: req.body.email })
    if (!patient) {
        if(req.body.password == req.body.confirm_password){
            try {
                
                const patient = new Patient({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    screen_name: req.body.first_name,
                    yearofbirth: req.body.yearofbirth,
                    height: req.body.height,
                    brief_bio: req.body.brief_bio,
                    engagement: 0,
                    
                    clinician: '626392e9a4d69d527a31780f',
                    //register Date 需要增加
                });
                
                if(req.body.weight_check=='on'){
                    patient.required_data.weight = true;
                    patient.bound.weight_upper=req.body.weight_upper;
                    patient.bound.weight_lower=req.body.weight_lower;
                } else{
                    patient.required_data.weight = false;
                }
                if(req.body.exercise_check=='on'){
                    patient.required_data.exercise = true;
                    patient.bound.exercise_upper=req.body.exercise_upper;
                    patient.bound.exercise_lower=req.body.exercise_lower;
                }else{
                    patient.required_data.exercise = false;
                }
                if(req.body.insulin_check=='on'){
                    patient.required_data.insulin = true;
                    patient.bound.insulin_upper=req.body.insulin_upper;
                    patient.bound.insulin_lower=req.body.insulin_lower;
                }else{
                    patient.required_data.insulin = false;
                }
                if(req.body.glucose_check=='on'){
                    patient.required_data.glucose = true;
                    patient.bound.glucose_upper=req.body.glucose_upper;
                    patient.bound.glucose_lower=req.body.glucose_lower;
                }else{
                    patient.required_data.glucose = false;
                }

                await patient.save();
                //医生要在这里添加一个patient
                console.log("Patient added");
                res.redirect('/clinician/dashboard');
            } catch (err) {
                console.log(err);
            }
        }
        // }else{
        //     console.log('password not match with the confirmed password');//用其他方式提示
        // }
    } else {
        console.log("Patient already exists\n");
        console.log("Patient id is : ", patient.id);
    }

}

//render about me hbs page   not yet done
const renderClinicianData = async (req, res) => {
    try {
        const clinician = await Clinician.findById(req.params.id).lean();
        res.render('', { layout: 'clinician.hbs', clinicianData: clinician });
    } catch (err) {
        res.status(400);
        res.send("error happened when rendering clinician data");
    }
}
//render NewPatient hbs page
const renderNewPatient = async (req, res) => {
    try {
        clinicianID = "626392e9a4d69d527a31780f";//hardcode 
        const clinician = await Clinician.findById(clinicianID).lean();

        res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', clinician: clinician });
    } catch (err) {
        console.log(err)
    }
}

//render clinician edit data page
const renderClinicianEditData = async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.params.id });

        res.render('clinician-editData.hbs', { layout: 'clinician.hbs', patient: patient });
    } catch (err) {
        console.log(err)
    }
}

//render individual patient hbs page
const renderPatientData = async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.params.id }).populate({
            path: 'records',
            populate: {
                path: 'record_id',
                options: { lean: true }
            }
        }).populate({
            path: 'clinician',
            options: { lean: true }
        }).lean();

        res.render('clinician-individualData.hbs', { layout: 'clinician.hbs', patient: patient });
    } catch (err) {
        console.log(err)
    }
}

//render the clinician dashboard hbs page
const renderDashboard = async (req, res) => {
    try {
        initialRecord("6263f5d7ef996dcc6dbf10af");
        const clinicianID = "626392e9a4d69d527a31780f";//hardcode for D2
        //get clinician's patients and populate their information
        const patients = (await Clinician.findById(clinicianID).populate({
            path: 'patients',
            options: { lean: true },
            populate: {
                path: 'patient_id',
                options: { lean: true },
                populate: {
                    path: 'records',
                    options: { lean: true },
                    populate: {
                        path: 'record_id',
                        options: { lean: true },
                    }
                }
            }
        }).lean()).patients;

        // put needed data into an array to be passed to the hbs page
        const patientList = [];

        for (i in patients) {
            const patient = patients[i].patient_id;
            for (j in patient.records) {
                const record = patient.records[j].record_id;
                if (record.date == (new Date()).toLocaleDateString("en-AU", { "timeZone": "Australia/Melbourne" })) {
                    patientList.push({
                        patient_id: patient._id,
                        first_name: patient.first_name,
                        bound: patient.bound,
                        today_record: record,
                    });
                }
            }
        }

        res.render('clinician-dashboard.hbs', { layout: 'clinician.hbs', patientList: patientList });

    } catch (err) {
        console.log(err)
    }
}

// everytime when clinician logs in, this function will be called to make sure there at least every patient has a record for today
async function initialRecord(patient_id) {
    try {
        const patient = await Patient.findById(patient_id);
        const record = await Record.findOne({ patientId: patient._id, date: (new Date()).toLocaleDateString("en-AU", { "timeZone": "Australia/Melbourne" }) });

        if (record == null) {
            const newRecord = new Record({
                patientId: patient._id,
                date: (new Date()).toLocaleDateString("en-AU", { "timeZone": "Australia/Melbourne" }),
            });
            if (!patient.required_data.glucose) {
                newRecord.data.glucose.status = "Not required";
            }
            if (!patient.required_data.weight) {
                newRecord.data.weight.status = "Not required";
            }
            if (!patient.required_data.exercise) {
                newRecord.data.exercise.status = "Not required";
            }
            if (!patient.required_data.insulin) {
                newRecord.data.insulin.status = "Not required";
            }
            await newRecord.save();
            patient.records.push({ record_id: newRecord._id });
            await patient.save();
        } else {
            console.log("record already exists");
        }


    } catch (err) {
        console.log(err);
    }
}

// have problem in this function, not used in Deveriable 2
const searchDashboard = async (req, res) => {
    try {
        if (req.body.patientName == '') {
            renderDashboard(req, res);
        } else {
            const clinicianID = "626392e9a4d69d527a31780f";
        
            const patients = (await Clinician.findById(clinicianID).populate({
                path: 'patients',
                populate: {
                    path: 'patient_id',
                    populate: {
                        path: 'records',
                        options: { lean: true },
                        populate: {
                            path: 'record_id',
                            options: { lean: true },
                        }
                    }
                }
            }).lean()).patients;
            
            const patientList = []

            for (i in patients) {
                const patient = patients[i].patient_id;
                
                if(patient.first_name == req.body.patientName || patient.last_name == req.body.patientName){
                    for (j in patient.records) {
                        const record = patient.records[j].record_id;
                        

                        if (record.date == (new Date()).toLocaleDateString("en-AU", { "timeZone": "Australia/Melbourne" })) {
                            patientList.push({
                                patient_id: patient._id,
                                first_name: patient.first_name,
                                bound: patient.bound,
                                today_record: record,
                            });
                        }
                    } 
                }
            }

            res.render('clinician-dashboard.hbs', { layout: 'clinician.hbs', patientList: patientList });

        }
    } catch (err) {
        console.log(err)
    }
}

//test function used for adding records
const addRecords = async (req, res) => {
    const patient = await Patient.findById("6263f5d7ef996dcc6dbf10af");
    const newRecord = new Record({
        patientId: "6263f5d7ef996dcc6dbf10af",
        date: "27/04/2022",
        data: {
            glucose: {
                status: "unrecorded",
                value: 0,
            },
            weight: {
                status: "Not required",
                value: 0,
            },
            exercise: {
                status: "unrecorded",
                value: 0,
            },
            insulin: {
                status: "unrecorded",
                value: 0,
            },
        },
    });
    await newRecord.save();
    patient.records.push({ record_id: newRecord._id });
    await patient.save();
}

module.exports = {
    renderDashboard,
    renderClinicianData,
    addNewPatient,
    renderPatientData,
    searchDashboard,
    renderClinicianEditData,
    renderNewPatient,
}
