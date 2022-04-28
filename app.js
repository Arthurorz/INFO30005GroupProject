// Import handlebars
const exphbs = require('express-handlebars');

// Import express
const express = require('express');
// Set your app up as an express app
const app = express();

//connect to database
require('./models/db');

Patient = require('./models/patient');
Record = require('./models/record');
Clinician = require('./models/clinician');

//Routers
const patientRouter = require('./routes/patientRouter.js');
const normalRouter = require('./routes/normalRouter.js');
const clinicianRouter = require('./routes/clinicianRouter.js');


// configure Handlebars
app.engine(
    'hbs',
    exphbs.engine({
        defaultLayout: 'normal',
        extname: 'hbs',
        helpers: require("./public/js/helpers.js").helpers,
    })
);
// set Handlebars view engine
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('public/static'));

// Set up to handle POST requests
app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })); // only needed for URL-encoded input

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
app.get('/', (req, res) => {
    res.send('Our demo app is working!');
});

// render page with normal header for testing
app.use('/normal', normalRouter);
app.get('/aboutDiabetes', (req, res) => {
    res.render("normal-aboutDia");
});
app.get('/aboutThisWeb', (req, res) => {
    res.render("normal-aboutWeb");
});
app.get('/login', (req, res) => {
    res.render("normal-login");
});
app.get('/forgetPassword', (req, res) => {
    res.render("normal-forgetpass");
});

// render page with patient header for testing
app.use('/patient', patientRouter);
app.get('/patient/homepage/123', (req, res) => {
    res.render("new", {
        layout: "patient.hbs",
    });
});

// render page with clinician header for testing
app.use('/clinicians', clinicianRouter);
app.get('/clinician', (req, res) => {
    res.render("clinician-individualData", {
        layout: "clinician.hbs",
    });
});

// Tells the app to listen on port 3000 and logs that information to the console. 
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
});