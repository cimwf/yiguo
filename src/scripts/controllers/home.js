import homeTpl from '../views/home.html';

const render = () => {
    $('#root').html(homeTpl);    
    changeTab();
}

const changeTab = () =>{
    $('nav li').on('tap',function(){
        let hashs = ['#position','#sort','#search','#shopCar',"#profile"];
        location.hash = hashs[$(this).index()]
        $(this).addClass('active').siblings().removeClass('active');
    })
}
export default{
    render
}