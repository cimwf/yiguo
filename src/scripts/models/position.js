const list = () => {
    return $.ajax({
        // url:"/api/listmore.json?pageNo=2&pageSize=15",
        url: '/api/position/list',
        success: function (data) {
            return data;
        }
    })
}
const refresh = () => {
    return $.ajax({
        // url:"/api/listmore.json?pageNo=2&pageSize=15",
        url: '/api/position/refresh',
        success: function (data) {
            return data;
        }
    })
}

const loadmore = (pageNo) => {
    return $.ajax({
        // url:"/api/listmore.json?pageNo=2&pageSize=15",
        url: '/lagou/listmore.json?pageNo=' + pageNo + '&pageSize=5',
        success: function (data) {
            return data;
        }
    })
}
const ygsxty = () => {
    return $.ajax({
        url: "/api/Template/GetTemplate",
        success: function (data) {
            return data;
        }
    })
}

const detail = () => {
    return $.ajax({
        type: "post",
        url: '/api/commodityapi/Commodity/GetCommodityInfo',
        headers: {
            // "Host": "b2capigateway.yiguo.com",
            // "Connection": "keep-alive",
            // "Content-Length": 397,
            "Accept": "application/json, text/plain, */*",
            // "Origin": "https://h5mall.yiguo.com",
            "appName": 3000025,
            // "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
            // "Content-Type": "application/json;charset=UTF-8",
            // "Referer": "https://h5mall.yiguo.com//product/product.html?commodityCode=1269399",
            // "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9"
        },
        data:
            // Body: {
            //     CommodityCode: "1269399",
            //     CommodityId: "",
            // },
            // Head: {
            //     CityCode: 1,
            //     CityId: "312d0556-0671-4f2e-8bac-7b8873b5a03a",
            //     DeviceId: "c84cc728b130178b0d14a546ff6528d1",
            //     DistrictId: "1f3180c7-4ec3-43ad-80b3-d4561ba20589",
            //     LoginToken: "",
            //     MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
            //     Token: ""
            // },
            // "Head": { "Token": "", "LoginToken": "", "CityId": "312d0556-0671-4f2e-8bac-7b8873b5a03a", "CityCode": 1, "DistrictId": "1f3180c7-4ec3-43ad-80b3-d4561ba20589", "DeviceId": "c84cc728b130178b0d14a546ff6528d1", "MobileOS": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1" }, "Body": { "CommodityCode": "1269399", "CommodityId": "" }         },
            JSON.stringify({ "Head": { "Token": "", "LoginToken": "", "CityId": "312d0556-0671-4f2e-8bac-7b8873b5a03a", "CityCode": 1, "DistrictId": "1f3180c7-4ec3-43ad-80b3-d4561ba20589", "DeviceId": "c84cc728b130178b0d14a546ff6528d1", "MobileOS": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1" }, "Body": { "CommodityCode": "1269399", "CommodityId": "" } }),
        success: function (data) {
            return data;
        }
    })
}


module.exports = {
    list,
    refresh,
    loadmore,
    ygsxty,
    detail
}