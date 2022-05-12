const Patient = require('../models/patient.js');
const Record = require('../models/record.js');
const Clinician = require('../models/clinician.js');


//Update the record of patient according to the type and id
const updateRecord = async(req,res,next) =>{
    try{
        const patient_id = req.user._id;
        const type = req.params.type;
        
        //find the record of today
        const record = await Record.findOne({patientId: patient_id, date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})});
        //update the record according to the form the user submit
        record.data[type].status = "recorded";
        record.data[type].value = req.body.addData;
        record.data[type].comment = req.body.addComment;
        record.data[type].date =new Date().toLocaleString("en-AU",{"timeZone":"Australia/Melbourne"});
        //save the record to the database
        await record.save();
        res.redirect('/patient/homepage/'+patient_id);
    }catch(err){
        return next(err);
    }
};

//If there is no record for today, create a new record.
async function initialRecord (patient_id){
    try{
        //get the patient and the record of that day.
        const patient = await Patient.findOne({ _id: patient_id });
        const record = await Record.findOne({patientId: patient._id, date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})});
        
        //If no record was find, create a new record.
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

//Render the homepage of the patient
const renderHomePage = async (req, res, next) => {
    try {
        //get all informatiion that need in the homepage
        const id = req.user._id;
        initialRecord(id);
        const patient = await Patient.findOne({ _id: id }).lean();
        const clinician = await Clinician.findById(patient.clinician).lean();
        const date = new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"});
        const today = await Record.findOne({date: date, patientId : id}).lean();
        
       
        //Get recent 7 days records, if there is no record for that day, insert null.
        const recent7 = [];
        for(let i=0;i<7;i++){
            const recent7date = new Date(new Date().getTime() - (i*24*60*60*1000)).toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"});       
            recent7.push({
                // only record day and month
                date: recent7date.substring(0,5),
                record: await Record.findOne({date: recent7date, patientId : id}).lean(),
            });
        }
        sortByDate(recent7);
        //Render the homepage
        res.render("new-homePage.hbs", { layout: 'patient.hbs', patient: patient, clinician: clinician,today: today,recent7: recent7});
    }catch (err) {
        return next(err);
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
    month1 = parseInt(record1.date.substring(3,5));
    month2 = parseInt(record2.date.substring(3,5));
    day1 = parseInt(record1.date.substring(0,2));
    day2 = parseInt(record2.date.substring(0,2));

    if(month1<month2){
        return -1;
    }else if(month1 == month2){
        if(day1<day2){
            return -1;
        }if(day1==day2){
            return 0;
        }else{
            return 1;
        }
    }else{
        return 1;
    }
}

//Render the page of the patient to add data
const renderAddPage = async (req, res, next) => {
    try{
        //find the patient and the record of the day
        const id = req.user._id;
        const patient = await Patient.findOne({ _id: id }).lean();
        const type = req.params.type;
        const record = await Record.findOne({patientId: id, date: new Date().toLocaleDateString("en-AU",{"timeZone":"Australia/Melbourne"})}).lean();
        
        //render the page for patient to record its data
        res.render("patient-addData.hbs", { layout: 'patient.hbs', type: type, record: record , patient: patient});
    }catch(err){
         return next(err);
    }
}

//render more data hbs page
const renderMoreData = async (req, res) => {
    try {
        const id = req.user._id;
        const patient = await Patient.findOne({ _id: id }).populate({
            path: 'records',
            populate: {
                path: 'record_id',
                options: { lean: true }
            }
        }).lean();

        res.render('patient-moreData.hbs', { layout: 'patient.hbs', patient: patient });
    } catch (err) {
        console.log(err)
    }
}


module.exports={
    renderAddPage,
    updateRecord,
    renderHomePage,
    renderMoreData,
}