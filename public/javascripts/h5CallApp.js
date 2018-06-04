window.callApp = (function () {
    var h5CallApp = function () {
        this.iframe = document.createElement('iframe')
        this.aLink = document.createElement('a')
        this.body = document.body
        this.loadTimer = null
        this.aLink.style.cssText = this.iframe.style.cssText = 'display:none;width:0px;height:0px;'
    }
    h5CallApp.prototype = {
        init: function(params) {
            this.appUrl = params.appUrl
            this.downLoadUrl = params.downLoadUrl
            this.waitTime = params.waitTime
            this.handleJump()
        },
        system: {
            isAnd: function() {
                return !!navigator.userAgent.match(/Android/i)
            },
            isMobileQQ: function() {
                var ua = navigator.userAgent
                return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d.]+)/.test(ua) || /\bV1_AND_SQI?_([\d.]+)(.*? QQ\/([\d.]+))?/.test(ua)
            },
            isIOS: function() {
                return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
            },
            isWx: function() {
                return !!navigator.userAgent.match(/micromessenger/i)
            },
            isWeibo: function() {
                return !!navigator.userAgent.match(/WeiBo/i)
            }
        },
        handleJump: function() {
            var ua = window.navigator.userAgent
            var system = this.system
            var isAndroidChrome = (ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)) && system.isAnd() && !system.isMobileQQ()
            if ((system.isWx() || system.isWeibo()) && system.isAnd()) {
                this.showGuide()
            } else if (system.isIOS()) {
                if (system.isWx() || system.isWeibo()) {
                    this.showGuide()
                } else {
                    /* this.aLink.href=this.appUrl;
                    this.body.append(this.aLink);
                    this.aLink.click(); */
                    location.href = this.appUrl
                }
            } else if (isAndroidChrome) {
                /* this.aLink.href=this.appUrl;
                this.body.append(this.aLink);
                this.aLink.click(); */
                this.iframe.src = this.appUrl
                this.body.appendChild(this.iframe)
            } else {
                this.iframe.src = this.appUrl
                this.body.appendChild(this.iframe)
            }
            this.handleError()
        },
        showGuide: function() {
            var coverEl = document.createElement('div')
            coverEl.className = 'cover-guide'
            coverEl.style.cssText = 'background: rgba(0, 0, 0, 0.78);position: relative;position: fixed;top: 0;bottom: 0;left: 0;right: 0'
            var divEl = document.createElement('div')
            divEl.style.cssText = 'background-image: url(../../../../images/mo/webapp/common/guide.png);background-repeat:no-repeat;background-position:center;height: 0.8rem;background-size: cover'
            coverEl.appendChild(divEl)
            this.body.appendChild(coverEl)
        },
        handleError: function() {
            var start = Date.now()
            var that = this
            this.loadTimer = setTimeout(function() {
                if (document.hidden || document.webkitHidden) {
                    return
                }
                if (!that.system.isWx()) {
                    if (Date.now() - start > that.waitTime + 200) {

                    } else {
                        window.location.href = that.downLoadUrl
                    }
                }
            }, that.waitTime)
            var visibilitychange = function() {
                var tag = document.hidden || document.webkitHidden
                tag && clearTimeout(that.loadTimer)
            }
            document.addEventListener('visibilitychange', visibilitychange, false)
            document.addEventListener('webkitvisibilitychange', visibilitychange, false)
            window.addEventListener('pagehide', function() {
                clearTimeout(that.loadTimer)
            }, false)
        }
    }
    return h5CallApp
})()
