var _domain = "http://39.108.151.200:9999";

(function(){
    var search = decodeURI(window.location.search),
    u = navigator.userAgent
    img = new Image();
    search = search.substr(1);
    search = search.split("&");

    // 微信分享
    $.ajax({
        "url":_domain + "/v1/public/share",
        "type":"post",
        "data":JSON.stringify({
            "uri":window.location.href
        }),
        "success":function(data){
            var config = data.data;
            // 关闭调试模式
            config["debug"] = false;
            // 需要使用的JS接口列表
            config["jsApiList"] = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"];
            wx.config(data.data);
        },
        "error":function(){

        }
    });

    // 设置头像
    img.src = search[2];
    img.onload = function(){
        $(".m-user .userImg").attr("src",img.src);
    };
    // 设置推荐码
    $(".m-number .number").val(search[0]);
    // 设置用户名
    $(".m-number .name").text(search[1] + "的推荐码");

    // 下载按钮
    $(".btn-down").on("click",function(){
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            // 安卓
            window.location.href = "";
        } else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            // iOS
            window.location.href = "";
        };
    });

    // 设置分享数据
    function setUpShareData (title, description, link, imgUrl) {
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: description,
            link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: imgUrl, // 分享图标
            },function(res) {

            }
        );

        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
            title: title, // 分享标题
            desc: description,
            link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: imgUrl, // 分享图标
            },function(res) {

            }
        );

        // 腾讯微博
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: description,
            link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        // QQ空间
        wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: description,
            link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    };

    // 微信分享准备就绪
    wx.ready(function(){
        setUpShareData('亲，我在神秘巨星APP等你哦~',
        '邀请码：' + search[0] + '，来即欧皇！',
        window.location.href,
        img.src);
        alert(1);
    });
}());