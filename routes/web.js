const homeController = require('../app/controllers/homeController');
const authController = require('../app/controllers/authController');
const cartController = require('../app/controllers/customers/cartController');
const guest= require('../app/middlewares/guest')

function initRoutes(app){
  /* BEFORE
   app.get('/', (req,res) => {
        res.render("home")
    }) AFTER*/
    app.get('/', homeController().index) 
  
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes;