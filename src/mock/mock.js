const list = require('./list.json');
const refresh = require('./refresh.json');
const yiguo = require("./yiguo.json")

module.exports = function(){
    return {
        list,
        refresh,
        yiguo
    }
}