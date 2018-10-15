const profileTpl = require('../views/profile.html');

const render = () =>{
    $('main').html(profileTpl)
}

module.exports = {
    render
}