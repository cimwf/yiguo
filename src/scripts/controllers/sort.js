import sortTpl from '../views/sort.html'
import Swiper from "swiper";

const render = () =>{
    $('main').html(sortTpl)
    console.log(1)
    new Swiper('.swiper-container',{
        pagination: {
            el: '.swiper-pagination',
            bulletElement : 'li'
        }
    })
    scroll()
}

const scroll = ()=>{
    let posScroll = new BScroll('main',{
        startY:-40
    })
}

export default{
    render
}