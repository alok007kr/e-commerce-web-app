require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const flash = require('flash')
const PORT = process.env.PORT || 3009;
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')

// Database connection
//const url = 'mongodb+srv://admin-alok:alok2021@cluster0.xefkarm.mongodb.net/phone';
// const url = 'mongodb://localhost:27017/phone';
const url = process.env.URL_SECRET;

mongoose.connect(url,{useNewUrlParser: true, useUnifiedtopology:true})
.then(() => {
    console.log("Database connected")
})
.catch((err) => {
    console.log("Connection failed")
})



// session store in mongodb
var mongoStore = new MongoDBStore({
    uri : url,
    collection : 'sessions'
})

// session setup
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    store : mongoStore,
    saveUninitialised : false,
    cookie: {maxAge : 1000*60*60*24}
}))


// Passport config 
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())



// Setting Assets, so we can import the image from direct image folder
app.use(express.static('public')) 
// Enable json data
app.use(express.json())
// To enable urlencoded data, i.e. sending from register form
app.use(express.urlencoded({ extended: false}))


// SetUp flash middleware
app.use(flash());



//Global middleware, we use this to access session in frontend
app.use((req,res,next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


// Always set this above from the routes
// Now set the template engine to display the Ejs pages
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs');

// sending response for the server page to the interface
// We moved our routes to our route folder. Now we have to import here.
// We also pass the "app" arguement to the route file.
require('./routes/web')(app);




app.listen(PORT, () => {
    console.log(`Listening to the ${PORT}`);
})
