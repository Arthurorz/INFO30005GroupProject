const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const Clinician = require('../models/clinician.js');
const Patient = require('../models/patient.js');
const Record = require('../models/record.js');



const editPatientData = async (req, res) => {
    
    const missBoundError = 'Need to add upper and lower bound';
    const upperAndLowerError = 'Upper bound should be larger than or equal to lower bound'
    try {
        const patient = await Patient.findById(req.params.id);
        const patientData = await Patient.findById(req.params.id).lean();
        console.log(patient);
        if (req.body.weight_check == 'on') {
            patient.required_data.weight = true;
            if (req.body.weight_upper != '' && req.body.weight_lower != '') {
                if (parseInt(req.body.weight_upper) >= parseInt(req.body.weight_lower)) {
                    patient.bound.weight_upper = req.body.weight_upper;
                    patient.bound.weight_lower = req.body.weight_lower;
                } else {
                    return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for weight', input: req.body, patientId: patientData._id });
                }
            } else {
                return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: missBoundError + 'for weight', input: req.body, patientId: patientData._id });
            }
        } else {
            patient.required_data.weight = false;
        }

        if (req.body.exercise_check == 'on') {
            patient.required_data.exercise = true;
            if (req.body.exercise_upper != '' && req.body.exercise_lower != '') {
                if (parseInt(req.body.exercise_upper) >= parseInt(req.body.exercise_lower)) {
                    patient.bound.exercise_upper = req.body.exercise_upper;
                    patient.bound.exercise_lower = req.body.exercise_lower;
                } else {
                    return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for exercise', input: req.body, patientId: patientData._id });
                }
            } else {
                return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: missBoundError+'for exercise', input: req.body, patientId: patientData._id });
            }
        } else {
            patient.required_data.exercise = false;
        }

        if (req.body.insulin_check == 'on') {
            patient.required_data.insulin = true;
            if (req.body.insulin_upper != '' && req.body.insulin_lower != '') {
                if (parseInt(req.body.insulin_upper) >= parseInt(req.body.insulin_lower)) {
                    patient.bound.insulin_upper = req.body.insulin_upper;
                    patient.bound.insulin_lower = req.body.insulin_lower;
                } else {
                    return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for insulin', input: req.body, patientId: patientData._id });
                }
            } else {
                return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: missBoundError + 'for insulin', input: req.body, patientId: patientData._id });
            }
        } else {
            patient.required_data.insulin = false;
        }

        if (req.body.glucose_check == 'on') {
            patient.required_data.glucose = true;
            if (req.body.glucose_upper != '' && req.body.glucose_lower != '') {
                if (parseInt(req.body.glucose_upper) >= parseInt(req.body.glucose_lower)) {
                    patient.bound.glucose_upper = req.body.glucose_upper;
                    patient.bound.glucose_lower = req.body.glucose_lower;
                } else {
                    return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for glucose', input: req.body, patientId: patientData._id });
                }
            } else {
                return res.render('clinician-editData.hbs', { layout: 'clinician.hbs', error: missBoundError + 'for glucose', input: req.body, patientId: patientData._id });
            }
        } else {
            patient.required_data.glucose = false;
        }


        await patient.save();
        
        res.redirect('/clinician/individualData/' + patientData._id);
    } catch (err) {
        console.log(err)
    }
}

const addNewPatient = async (req, res) => {

    const missBoundError = 'Error: Need to add upper and lower bound';
    const upperAndLowerError = 'Error: Upper bound should be larger than or equal to lower bound'
    const passwordConfirmError = 'Error: Password and confirm password do not match';
    const mailExistError = 'Error: Email already exists';


    const patient = await Patient.findOne({ email: req.body.email.toLowerCase() });
    if (!patient) {
        if (req.body.password == req.body.confirm_password) {
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

                    clinician: '626392e9a4d69d527a31780f',// hardcode
                    //register Date 需要增加
                });
                

                if (req.body.weight_check == 'on') {
                    patient.required_data.weight = true;
                    if (req.body.weight_upper != '' && req.body.weight_lower != '') {
                        if (parseInt(req.body.weight_upper) >= parseInt(req.body.weight_lower)) {
                            patient.bound.weight_upper = req.body.weight_upper;
                            patient.bound.weight_lower = req.body.weight_lower;
                        } else {
                            return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for weight', input: req.body });
                        }
                    } else {
                        return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: missBoundError + 'for weight', input: req.body });
                    }
                } else {
                    patient.required_data.weight = false;
                }

                if (req.body.exercise_check == 'on') {
                    patient.required_data.exercise = true;
                    if (req.body.exercise_upper != '' && req.body.exercise_lower != '') {
                        if (parseInt(req.body.exercise_upper) >= parseInt(req.body.exercise_lower)) {
                            patient.bound.exercise_upper = req.body.exercise_upper;
                            patient.bound.exercise_lower = req.body.exercise_lower;
                        } else {
                            return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for exercise', input: req.body });
                        }
                    } else {
                        return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: missBoundError+'for exercise', input: req.body });
                    }
                } else {
                    patient.required_data.exercise = false;
                }

                if (req.body.insulin_check == 'on') {
                    patient.required_data.insulin = true;
                    if (req.body.insulin_upper != '' && req.body.insulin_lower != '') {
                        if (parseInt(req.body.insulin_upper) >= parseInt(req.body.insulin_lower)) {
                            patient.bound.insulin_upper = req.body.insulin_upper;
                            patient.bound.insulin_lower = req.body.insulin_lower;
                        } else {
                            return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for insulin', input: req.body });
                        }
                    } else {
                        return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: missBoundError + 'for insulin', input: req.body });
                    }
                } else {
                    patient.required_data.insulin = false;
                }

                if (req.body.glucose_check == 'on') {
                    patient.required_data.glucose = true;
                    if (req.body.glucose_upper != '' && req.body.glucose_lower != '') {
                        if (parseInt(req.body.glucose_upper) >= parseInt(req.body.glucose_lower)) {
                            patient.bound.glucose_upper = req.body.glucose_upper;
                            patient.bound.glucose_lower = req.body.glucose_lower;
                        } else {
                            return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: upperAndLowerError + 'for glucose', input: req.body });
                        }
                    } else {
                        return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: missBoundError + 'for glucose', input: req.body });
                    }
                } else {
                    patient.required_data.glucose = false;
                }

                await patient.save();
                const clinician = await Clinician.findById("626392e9a4d69d527a31780f");
                clinician.patients.push({
                    patient_id: patient._id,
                });
                await clinician.save();
                //医生要在这里添加一个patient
                console.log("Patient added");
                res.redirect('/clinician/dashboard');
            } catch (err) {
                console.log(err);
            }
        } else {
            return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: passwordConfirmError, input: req.body });
        }
    } else {
       
        return res.render('clinician-newPatient.hbs', { layout: 'clinician.hbs', error: mailExistError, input: req.body });
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
//render comment list page 
const renderCommentList = async (req, res) => {
    try {
        const clinicianID = "626392e9a4d69d527a31780f";//hardcode for D2
        const clinician = await Clinician.findById(clinicianID);
        const lastTime = clinician.lastTimeViewCommentList;
        clinician.lastTimeViewCommentList = new Date().toLocaleString("en-AU",{"timeZone":"Australia/Melbourne"});
        await clinician.save();
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

        const commentList = [];
        for(i in patients){
            const patient = patients[i].patient_id;
            for(j in patient.records){
                const record = patient.records[j].record_id;
                if(record.data.weight.comment!=''){
                    
                    commentList.push({
                        //patientAvatar:  *******,
                        timeStamp: record.data.weight.date,
                        comment:record.data.weight.comment,
                        patientName: patient.first_name,
                        upper_bound : patient.bound.weight_upper,
                        lower_bound : patient.bound.weight_lower,
                        value : record.data.weight.value,
                        type: 'weight',
                        unit : 'kg'
                    });
                }
                if(record.data.glucose.comment!=''){
                    commentList.push({
                        //patientAvatar:  *******,
                        timeStamp: record.data.glucose.date,
                        comment:record.data.glucose.comment,
                        patientName: patient.first_name,
                        upper_bound : patient.bound.glucose_upper,
                        lower_bound : patient.bound.glucose_lower,
                        value : record.data.glucose.value,
                        type: 'glucose',
                        unit : 'nmol/L'
                    });
                }
                if(record.data.exercise.comment!=''){
                    commentList.push({
                        //patientAvatar:  *******,
                        timeStamp: record.data.exercise.date,
                        comment:record.data.exercise.comment,
                        patientName: patient.first_name,
                        upper_bound : patient.bound.exercise_upper,
                        lower_bound : patient.bound.exercise_lower,
                        value : record.data.exercise.value,
                        type: 'exercise',
                        unit: 'steps'
                    });
                }
                if (record.data.insulin.comment != '') {
                    commentList.push({
                        //patientAvatar:  *******,
                        timeStamp: record.data.insulin.date,
                        comment: record.data.insulin.comment,
                        patientName: patient.first_name,
                        upper_bound: patient.bound.insulin_upper,
                        lower_bound: patient.bound.insulin_lower,
                        value: record.data.insulin.value,
                        type: 'insulin',
                        unit: 'doses'
                    });
                }
            }
        }
        sortByTimeStamp(commentList);
        for (i in commentList){
            if(compareByTimeStamp(commentList[i].timeStamp,lastTime)<=0){
                commentList[i].new = false;
            }else{
                commentList[i].new = true;
            }
        }
        res.render('clinician-commentList.hbs', { layout: 'clinician.hbs', commentList: commentList});
    } catch (err) {
        res.status(400);
        res.send("error happened when rendering commentList page");
    }
}

function sortByTimeStamp(commentList){
    //insertion sort
    for (var i = 1; i < commentList.length; i++) {
        var temp = commentList[i];
        for (j = i - 1; j >= 0; j--) {
            if(compareByTimeStamp(temp.timeStamp,commentList[j].timeStamp)>0){
                commentList[j+1]=commentList[j]
            }
            else{
                break;
            }
        }
        commentList[j+1] = temp;
    }
}

function compareByTimeStamp(timeStamp1,timeStamp2){
    month1 = parseInt(timeStamp1.substring(3, 5));
    month2 = parseInt(timeStamp2.substring(3, 5));
    day1 = parseInt(timeStamp1.substring(0, 2));
    day2 = parseInt(timeStamp2.substring(0, 2));
    year1 = parseInt(timeStamp1.substring(6, 10));
    year2 = parseInt(timeStamp2.substring(6, 10));
    //if the hour is 1 digit number add a 0 before the string
    if (timeStamp1.length == 22) {
        timeStamp1 = "0"+ timeStamp1
    }
    hour1 = parseInt(timeStamp1.substring(12, 14));
    minute1 = parseInt(timeStamp1.substring(15, 17));
    second1 = parseInt(timeStamp1.substring(18, 20));
    unit1 = timeStamp1.substring(21, 23);
    //if the hour is 1 digit number add a 0 before the string
    if (timeStamp2.length == 22) {
        timeStamp2 = "0"+ timeStamp2
    }
    hour2 = parseInt(timeStamp2.substring(12, 14));
    minute2 = parseInt(timeStamp2.substring(15, 17));
    second2 = parseInt(timeStamp2.substring(18, 20));
    unit2 = timeStamp2.substring(21, 23);

    //transform the time to 24 hour format
    if (unit1 == "pm") {
        hour1 = hour1 + 12;
    }
    if (unit2 == "pm") {
        hour2 = hour2 + 12;
    }
    //check if the timeStamp1 is not initialized
    if (timeStamp1 == null) {
        return -1;
    } else if (timeStamp2 == null) {
        return 1;
    }
    //compare the timeStamp
    if (year1 < year2) {
        return -1;
    }
    else if (year1 == year2) {
        if (month1 < month2) {
            return -1;
        }
        else if (month1 == month2) {
            if (day1 < day2) {
                return -1;
            }
            else if (day1 == day2) {
                if (hour1 < hour2) {
                    return -1;
                }
                else if (hour1 == hour2) {
                    if (minute1 < minute2) {
                        return -1;
                    }
                    else if (minute1 == minute2) {
                        if (second1 < second2) {
                            return -1;
                        }
                        else if (second1 == second2) {
                            return 0;
                        }
                    }
                }
            }
        }
    }
    return 1;
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
        const patient = await Patient.findById(req.params.id).lean();

        res.render('clinician-editData.hbs', { layout: 'clinician.hbs', patient: patient , patientId : patient._id});
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
        const records = patient.records;
        const recordList = [];
        for (i in records){
            recordList.push(records[i]);
        }
        sortByDate(recordList);
        res.render('clinician-individualData.hbs', { layout: 'clinician.hbs', patient: patient, records: recordList});
    } catch (err) {
        console.log(err)
    }
}

function sortByDate(recordList){
    //insertion sort
    for (var i = 1; i < recordList.length; i++) {
        var temp = recordList[i];
        for (j = i - 1; j >= 0; j--) {
            if(compareByDate(temp,recordList[j])>0){
                recordList[j+1]=recordList[j]
            }
            else{
                break;
            }
        }
        recordList[j+1] = temp;
    }
}

function compareByDate(record1, record2){
    month1 = parseInt(record1.record_id.date.substring(3,5));
    month2 = parseInt(record2.record_id.date.substring(3,5));
    day1 = parseInt(record1.record_id.date.substring(0,2));
    day2 = parseInt(record2.record_id.date.substring(0,2));
    year1 = parseInt(record1.record_id.date.substring(6,10));
    year2 = parseInt(record2.record_id.date.substring(6,10));

    if (year1 < year2) {
        return -1;
    }
    else if (year1 == year2) {
        if(month1<month2){
            return -1;
        }else if(month1 == month2){
            if(day1<day2){
                return -1;
            }if(day1==day2){
                return 0;
            }
        }
    }
    return 1;
}

const saveSupportMsg = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        patient.support_msg = req.body.support_msg;
        await patient.save();
        res.redirect('/clinician/individualData/' + req.params.id);
    } catch (err) {
        console.log(err)
    }

}
//render the clinician dashboard hbs page
const renderDashboard = async (req, res) => {
    try {
        const clinicianID = "626392e9a4d69d527a31780f";//hardcode for D2
        const allPatient = (await Clinician.findById(clinicianID).populate({
            path: 'patients',
            options: { lean: true }
        }).lean()).patients;
        for (i in allPatient) {
            patient = allPatient[i];
            initialRecord(patient.patient_id.toString());
        }
        
        
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
        console.log(patient);
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

                if (patient.first_name == req.body.patientName || patient.last_name == req.body.patientName) {
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
    editPatientData,
    saveSupportMsg,
    renderCommentList,
}
