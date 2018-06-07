let $openAppBtn = $('.js-open-app');
console.log(99);

$.ajax({
    type: "POST",
    url: "/DishMenus/Main2/Search/searchResult",
    data: {
        "keywords": "素菜",
        "type": "caipu",
        'page': 2
    },
    dataType: "json",
    success: function (data) {
        // console.log(data)
    }
})

$openAppBtn.on("click", () => {
    handleFn.openApp();
})

let handleFn = {
    openApp: () => {
        let isIos = navigator.userAgent.match(/iPhone|iPad|iPod/i);
        let url = isIos ? 'xianghalink://' : 'xiangha://welcome?';
        url += "showWeb.app?url=" + encodeURIComponent(location.href);
        let h5CallApp = new callApp();
        h5CallApp.init({
            appUrl: url,
            waitTime: 3000,
            downLoadUrl: 'https://m.xiangha.com/download/android?c=dishTags'
        });
    }
}