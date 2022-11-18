const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt =  require('bcrypt')


function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async(email,password,done) => {
        // LOGIN LOGIC
        // check if email exist
        const user = await User.findOne({email: email})
        if(!user){
            return done(null, false, {message: "No User with this mail"})
        }
        bcrypt.compare(password, user.password).then(match => {
            if(match){
                return done(null,user, {message: "Logged in successfully"})
            }
            return done(null, false, {message: "Wrong username and password"})
        }).catch(err => {
            return done(null, false, {message: "Something went wrong"})
        })

    }))
    

    // We use this to store the user id in the session to know that the user is login or not
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    // We use this to access all data or know what we store in the session
    passport.deserializeUser((id,done) => {
        User.findById(id, (err,user) => {
            done(err,user)
        })
    }) 

}

module.exports = init