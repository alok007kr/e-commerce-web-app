const homeController = require('../app/controllers/homeController');
const authController = require('../app/controllers/authController');
const cartController = require('../app/controllers/customers/cartController');
const orderController = require('../app/controllers/customers/orderController')
const guest= require('../app/middlewares/guest')
const auth = require('../app/middlewares/auth')
const adminOrderController = require('../app/controllers/admin/orderController')

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

    app.post('/orders', auth, orderController().store)

    // customer order route
    app.get('/customer/orders', auth, orderController().index)

    // admin orders route
    app.get('/admin/orders', adminOrderController().index)
}

module.exports = initRoutes;