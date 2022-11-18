const Menu = require('../models/menu')

function homeController(){
    return{
        async index(req,res){

            const phones = await Menu.find()
            res.render('home', {phones: phones})
            /*
            Menu.find().then(function(phones) {
                console.log(phones);
                res.render('home', {phones: phones})

            })
            */
            // res.render('home')
        }
    }
}

module.exports = homeController;