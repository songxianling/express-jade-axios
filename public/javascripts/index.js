$('.info').html('差点被祭天的程序员～～～')

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
let mFn = {
    add: () => {
        let $goUser = $('#js-go-user');
        $goUser.html('随便跳跳')
        for (let i = 0; i < 10000; i++) {
            if (i == 7777) {
                console.log('ok')
                setStore('name', 'lili')
            }
        }
    }
}
let oText = '';
for (let i = 0; i < 1000; i++) {
    if (i == 77) {
        oText = '内容'
    }
    if (i == 999) {
        oText = 'long'
        mFn.add()
    }
}

let a = urlParse()
console.log(a)
