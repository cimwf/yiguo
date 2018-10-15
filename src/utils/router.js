function Router(){
    this.routes = {},
    this.currentHash = ''
}

var noop = function(){}
//路由绑定
Router.prototype.route = function(hash,cb){
    this.currentHash = hash;
    this.routes[this.currentHash] = cb || noop
}
//路由刷新
Router.prototype.refresh = function(){
    let hash = location.hash || '#position';
    this.currentHash = hash;
    this.routes[this.currentHash]()
    this.switchTabbar();
}

Router.prototype.switchTabbar = function(){
    let hash = location.hash;
    let hashs = ['#position','#sort','#search','#shopCar','#profile'];
    let index = hashs.indexOf(this.currentHash);
    $('nav li').eq(index).addClass('active').siblings().removeClass('active');
}

//路由切换监听
Router.prototype.init = function(){
    window.addEventListener('load',this.refresh.bind(this));
    window.addEventListener('hashchange',this.refresh.bind(this));
}

module.exports = Router;