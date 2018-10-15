import positionTpl from'../views/position.html'
import positionListTpl from'../views/position-list.html'
import positionModel from '../models/position.js'
import positionNavTpl from '../views/position-nav.html'
import positionBannerTpl from '../views/position-banner.html'
import positionMainTpl from '../views/position-main.html'
import Swiper from "swiper";

const render = async () => {
    $('main').html(positionTpl)
    let yiguo = await positionModel.ygsxty()
    // console.log(yiguo)
    // let detail = await positionModel.detail();
    // console.log(detail)
    let list = yiguo.data.template.componentList[0].carouselPictures;
    let nav = yiguo.data.template.componentList[0].componentNavs;
    let banner = yiguo.data.template.componentList[1].componentCommoditys
    let arr = [];
    let dataSource = [];
    for(let i=12;i<38;i++){
        var n = yiguo.data.template.componentList[i].componentCommoditys[0];  
        arr.push(n)      
    }
    console.log(arr)
    for(let i=0;i<5;i++){
        dataSource.push(arr[i]);
    }
    // console.log(dataSource)
    await renderList(list);
    await renderNav(nav);
    await renderBanner(banner);
    await renderMain(dataSource);
    scrollX();
    scroll(dataSource,arr);
}

const renderList = async (list)=>{
    let template = Handlebars.compile(positionListTpl);
    let html = template({ list })
    $('.swiper-container').html(html)
    new Swiper('.swiper-container',{
        autoplay:true,
        pagination: {
            el: '.swiper-pagination',
            bulletElement : 'li',
            dynamicBullets: true,
            dynamicMainBullets: 1
        }
    })
}
const renderNav = async (nav)=>{
    let template = Handlebars.compile(positionNavTpl);
    let html = template({ nav });
    $('.position-nav').html(html)
}

const scrollX = ()=>{
    let posScrollX = new BScroll('.position-banner',{
        scrollX:true
    })
    // console.log(posScrollX)
}

const renderBanner = (banner)=>{
    let template = Handlebars.compile(positionBannerTpl);
    let html = template({ banner })
    $('.position-banner').html(html)
}
const renderMain = (dataSource)=>{
    let template = Handlebars.compile(positionMainTpl);
    let html = template({ dataSource })
    $('.position-main').html(html)
}
const scroll = (dataSource,arr)=>{
    let posScroll = new BScroll('main',{
        probeType:2,
        startY:-40
    })
    let head = $(".head img"),
        foot = $(".foot img")
    posScroll.on('scroll',function(){
        let y = this.y;
        let maxY = this.maxScrollY - y;
        // console.log(y);
        if(y>=0){
            head.addClass("up")
        }
        if(maxY>=0){
            foot.addClass("down")
        }
    })
    let ref = dataSource;
    let refArr = arr; 
    posScroll.on('scrollEnd',async function(){
        let y = this.y;
        let maxY = this.maxScrollY - y;
        if(y>=-40 && y<0){
            this.scrollTo(0,-40)
        }else if(y==0){
            head.attr("src","./images/ajax-loader.gif")
            renderMain(ref)
            this.refresh();
            head.attr('src','/images/arrow.png')
            .removeClass("up")
            this.scrollTo(0,-40)
        }
        if(maxY>=-40&&maxY<0){
            this.scrollTo(0,this.maxScrollY+40)
        }else if(maxY==0){
            foot.attr("src","./images/ajax-loader.gif")
            let n = 5;
            for(var i=n;i<n+5;i++){
                dataSource.push(refArr[i]);
            }
            // console.log(dataSource)
            renderMain(dataSource);
            this.refresh();
            head.attr('src','/images/arrow.png')
            .removeClass("down")
            this.scrollTo(0,this.maxScrollY+40)
        }
    })

}

export default{
    render
}