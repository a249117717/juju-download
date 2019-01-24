var download = {
    "android":"https://a.app.qq.com/o/simple.jsp?pkgname=com.wayou.juju",   // 安卓下载地址
    "iOS":""// iOS下载地址
};
// var download = {
//     "android":"",   // 安卓下载地址
//     "iOS":""// iOS下载地址
// };

(function(){
    var search = decodeURI(window.location.search),
    u = navigator.userAgent
    img = new Image();
    search = search.substr(1);
    search = search.split("&");

    // 设置头像
    img.src = search[2];
    img.onload = function(){
        $(".m-user .userImg").attr("src",img.src);
    };
    // 设置推荐码
    $(".m-number .number").val(search[0]);
    // 设置用户名
    $(".m-number .name").text(search[1] + "的推荐码");

    // 检测输入框，不允许用户变更输入框内容
    $(".m-number .number").on("input",function(){
        var $this = $(this);
        $this.val($this.attr("old"));
    });

    // 按钮特效
    $(".btn").on({
        "touchstart":function(){
            $(this).addClass("active");
        },
        "touchend":function(){
            $(this).removeClass("active");
        }
    });

    // 下载按钮
    $(".btn-down").on("click",function(){
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            // 安卓
            window.location.href = download.android;
        } else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            // iOS
            window.location.href = download.iOS;
        };
    });

    // 复制
    (function(){
        var clipboard = new ClipboardJS('.btn-copy',{
            text:function() {
                return $(".m-number .number").val();
            }
        });
        clipboard.on('success', function(e) {
            layer.msg("复制成功");
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
            layer.msg("非常抱歉，复制失败，你可能尝试自行复制");
        });
    }());

    // 微信分享
    // $.ajax({
    //     "url":_domain + "/v1/public/share",
    //     "type":"post",
    //     "data":JSON.stringify({
    //         "uri":window.location.href
    //     }),
    //     "success":function(data){
    //         var config = data.data;
    //         // 关闭调试模式
    //         config["debug"] = false;
    //         // 需要使用的JS接口列表
    //         config["jsApiList"] = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"];
    //         wx.config(data.data);
    //     },
    //     "error":function(){

    //     }
    // });

    // // 设置分享数据
    // function setUpShareData (title, description, link, imgUrl) {
    //     // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    //     wx.updateAppMessageShareData({
    //         title: title, // 分享标题
    //         desc: description,
    //         link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
    //         imgUrl: imgUrl, // 分享图标
    //         },function(res) {

    //         }
    //     );

    //     // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    //     wx.updateTimelineShareData({
    //         title: title, // 分享标题
    //         desc: description,
    //         link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
    //         imgUrl: imgUrl, // 分享图标
    //         },function(res) {

    //         }
    //     );

    //     // 腾讯微博
    //     wx.onMenuShareWeibo({
    //         title: title, // 分享标题
    //         desc: description,
    //         link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
    //         imgUrl: imgUrl, // 分享图标
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户取消分享后执行的回调函数
    //         }
    //     });

    //     // QQ空间
    //     wx.onMenuShareQZone({
    //         title: title, // 分享标题
    //         desc: description,
    //         link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
    //         imgUrl: imgUrl, // 分享图标
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户取消分享后执行的回调函数
    //         }
    //     });
    // };

    // // 微信分享准备就绪
    // wx.ready(function(){
    //     setUpShareData('亲，我在神秘巨星APP等你哦~',
    //     '邀请码：' + search[0] + '，来即欧皇！',
    //     window.location.href,
    //     img.src);
    // });
}());