const order = require('../../models/order')
const Order = require('../../models/order')

function orderController(){
    return{
        index(req,res){
            /*
            order.find({status : {$ne: 'completed'}}, null, {sort: {'createdAt': -1}}).populate('customerId', -password).exec((err,orders) => {
                res.render('admin/orders')
            }) */
            // Using populate we can get all the data regarding that. so, we get all data regarding to customerId
    
           res.render('admin/orders')
        }
    }
}

module.exports = orderController