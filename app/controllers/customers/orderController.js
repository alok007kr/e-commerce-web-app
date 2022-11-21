const Order = require('../../models/order')
const moment = require('moment')

function orderController(){
    return{
        store(req,res){
           // console.log(req.body)
           const { address } = req.body
           // Validate request
           if(!address){
            req.flash('error', 'All fields are required')
            return res.redirect('/cart')
           }

           const order = new Order({
            customerId: req.user._id, // we get this from the passportjs
            items: req.session.cart.items, // we get this from session
            address: address
           })


           // After doing above save it

           order.save().then(result => {
            req.flash('success','Order placed successfuly');
            delete req.session.cart
            return res.redirect('/customer/orders')
           }).catch(err => {
            req.flash('error', 'Something went wrong')
            return res.redirect('/cart')
           })
        },



        async index(req,res){
            // Here we will fetch the order data from the database
            // All the data , we are getting through the req are coming from session
            // And after that we will send this to frontend part
           // res.render("customers/orders")
            
            const orders = await Order.find({ customerId: req.user._id },
                null,
                {sort: {'createdAt': -1}}) 
            res.render('customers/orders', {orders: orders, moment:moment})

        //    console.log(orders)
        }

        
    }
}

module.exports = orderController
