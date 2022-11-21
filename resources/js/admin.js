/*

const { default: axios } = require("axios");

function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody')

    let orders = [] // defined order to having array of orders

    let markup; // for html tabel in admin/orders page

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }.then(res => {
            orders = res.data
            markup = generateMarkup(orders)
            orderTableBody.innerHTML = markup
        }).catch(err => {
            console.log(`Error during Ajax call to fetch data for Admin ${err}`)
        })
    })


    function generateMarkup(orders){
        
    }

}

module.exports = initAdmin

*/