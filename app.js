// Import handlebars
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')

// Import express
const express = require('express');
// Set your app up as an express app
const app = express();

//connect to database
require('./models/db');

Patient = require('./models/patient');
Record = require('./models/record');
Clinician = require('./models/clinician');
Note = require('./models/note')

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
app.use(flash());
app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })); // only needed for URL-encoded input

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
app.get('/', (req, res) => {
    res.send('Diabetes app listening on port 3000!');
});

// Track authenticated users through login sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'weballgood',
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); 
}

// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))

// render page with normal header for testing
app.use('/normal', normalRouter);

// render page with patient header for testing
app.use('/patient', patientRouter);
app.get('/change', (req, res) => {
    res.render("patient-changePass", {
        layout: "patient.hbs"
    });
});
app.get('/data', (req, res) => {
    res.render("patient-moreData", {
        layout: "patient.hbs"
    });
});

app.get('/aboutme', (req, res) => {
    res.render("patient-aboutme", {
        layout: "patient.hbs",
    }); 
}); 


// render page with clinician header for testing
app.use('/clinician', clinicianRouter);

app.get('/individual', (req, res) => {
    res.render("clinician-individualData", {
        layout: "clinician.hbs",
    }); 
}); 
app.get('/caboutme', (req, res) => {
    res.render("clinician-aboutme", {
        layout: "clinician.hbs",
    }); 
}); 
app.get('/comment', (req, res) => {
    res.render("clinician-commentList", {
        layout: "clinician.hbs",
    }); 
}); 
// Tells the app to listen on port 3000 and logs that information to the console. 
app.listen(process.env.PORT || 3000, () => {
    console.log('Diabetes app listening on port 3000!');
});