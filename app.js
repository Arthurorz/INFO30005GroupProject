// Import handlebars
const exphbs = require('express-handlebars');

// Import express
const express = require('express');
// Set your app up as an express app
const app = express();

//connect to database
require('./models/db');
require('./models/patient');
require('./models/record');

//test
const patientRouter = require('./routes/patientRouter.js');

const normalRouter = require('./routes/normalRouter.js');

const clinicianRouter = require('./routes/clinicianRouter.js');


// configure Handlebars
app.engine(
    'hbs',
    exphbs.engine({
        defaultLayout: 'normal',
        extname: 'hbs',
    })
);
// set Handlebars view engine
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('30005image'));

// Set up to handle POST requests
app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })); // only needed for URL-encoded input

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
// app.get('/', (req, res) => {
//     res.render("normal-landingPage")
// }); 
app.use('/normal', normalRouter);

app.get('/', (req, res) => {
    res.send('Our demo app is working!');
});

app.get('/normal', (req, res) => {
    res.render("normal-login");
});

app.get('/patients', patientRouter);

app.get('/patient', (req, res) => {
    res.render("patient-addData", {
        layout: "patient.hbs",
    }); 
}); 
app.get('/clinicians', clinicianRouter);

app.get('/clinician', (req, res) => {
    res.render("clinician-dashboard",{
        layout: "clinician.hbs",
    });
}); 

// Tells the app to listen on port 3000 and logs that information to the console. 
app.listen(3000, () => { 
    console.log('Demo app is listening on port 3000!') 
});