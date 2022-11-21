//console.log("Hello from the js")
import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
let addToCart = document.querySelectorAll('.add-to-cart');

let cartCounter = document.querySelector('#cartCounter')

function updateCart(phone){
    // send data to cart page
    axios.post('/update-cart', phone)
    .then((res) => {
        //console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong'
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        //console.log(e);
        let phone = JSON.parse(btn.dataset.phone)
        updateCart(phone)
       // console.log(phone)
    })
})

//initAdmin()