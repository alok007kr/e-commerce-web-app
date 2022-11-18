const User = require("../models/user")
const bcrypt = require('bcrypt')
const passport = require("passport")

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },






        postLogin(req,res,next){
            const { email, password } = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            
            passport.authenticate('local',(err,user,info) => {
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                // if user is not present
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res,next)
        },







        register(req,res){
            res.render('auth/register')
        },





        async postRegister(req,res){
            const { name, email, password} = req.body
            // From we can see the entered data in form, but the data coming from post is url encoded
            //  console.log(req.body) 
            // so first we have to enable the url encoded data in server.js file

            // Validate request
            if(!name || !email || !password){
                req.flash('error', 'All fields are required')  // We can access this on UI using messages keyword
                return res.redirect('/register')
            }

            // Chek if email exists
            User.exists({email: email}, (err,result) => {
                if(result){
                    req.flash('error', 'Email is already regsitered')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            // Hash Password
            const hashedPassword = await bcrypt.hash(password,10)

            // Create a User and store it on the database
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then(() => {
                // redirect after successful register
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })
            console.log(req.body)  
        },


        logout(req,res,next){
            req.logout((err) => {
                if(err){
                    return next(err)
                }
                res.redirect('/login')
            })
        }
    }
}

module.exports = authController;