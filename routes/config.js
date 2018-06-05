let HOST = 'localhost:1111';
let BASEURL;
if(HOST.indexOf('localhost') != -1 || HOST ==  '192.168.1.61'){
    BASEURL = 'https://apiwx.xiangha.com'
}else{
    BASEURL = 'https://apiwx.xiangha.com'
}

module.exports = BASEURL;
