$(document).ready(() => {
    let $openAppBtn = $('.js-open-app');

    $openAppBtn.on("click", (event) => {
        console.log('打开APP');
        handleFn.openApp();
        event.stopPropagation();
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
});