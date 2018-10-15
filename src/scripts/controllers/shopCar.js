const shopCarTpl = require('../views/shopCar.html');

const render = () =>{
    $('main').html(shopCarTpl)
}

module.exports = {
    render
}