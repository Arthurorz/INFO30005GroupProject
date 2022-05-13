const req = require('express/lib/request')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Clinician = require('./models/clinician')
const Patient = require('./models/patient')

// Updated serialize/deserialize functions
passport.serializeUser((user, done) => {
    done(undefined, {_id: user._id, screen_name: user.screen_name})
})

passport.deserializeUser((userId, done) => {
    if (userId.screen_name === undefined) {
        Clinician.findById(userId, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)})
    } else {
        Patient.findById(userId, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)})
    }
})

// Updated LocalStrategy function
passport.use("clinician-login",
new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
        Clinician.findOne({ 'email': email.toLowerCase() }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }

            // Check password
            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect username or password',
                    })
                }
            
                // If user exists and password matches the hash in the database
                return done(undefined, user)
            })
        })
    })
)

passport.use("patient-login",
    new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
    },
    function(email, password, done) {
        Patient.findOne({ 'email': email.toLowerCase() }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }

            // Check password
            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect username or password',
                    })
                }
            
                // If user exists and password matches the hash in the database
                return done(undefined, user)
            })
        })
    })
)

// Clinician.find({}, (err, users) => {
//     if (users.length > 2) return;
//     Clinician.create({ first_name: 'test1', last_name: 'test1', email: 'test1@qq.com', password:'allgoodtest1', yearofbirth:'1990' }, (err) => {
//         if (err) { console.log(err); return; }
//         console.log('Dummy user inserted')
//     })
// })

module.exports = passport