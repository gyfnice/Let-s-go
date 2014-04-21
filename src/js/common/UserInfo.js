require("noify.js");
function UserInfo() {
    UserInfo.superclass.constructor.apply(this, arguments);
}


$jex.extendClass(UserInfo, XControl);
var superflag = 0;

var searchHandler = function() {
    var $search = $(".hsearch");
    $search.find(".tsearch-submit").off("click").on("click", function(e) {
        var $searchinput = $search.find("input");
        if ($.trim($searchinput.val()) === "") {
            alert("请输入搜索的关键字");
            $searchinput.focus();
            e.preventDefault();
        }
        $searchinput.val($.trim($searchinput.val()));
    });
}

UserInfo.prototype.update = function(data) {
    superflag = 0;
    debugger;
    if (data.islogin) {
        this.text('<a class = "u-name" href="userinfo.html?userid=', data.data.studentId, '">', data.data.userName, '</a>');
        this.text('<a href="#" class="backinfo">登出</a>');
        this.text('<a href="#" style="display:none">登录</a>');
        this.text('<span class = "userid" style="display:none">', data.data.studentId, '</span>');
        this.text('<a href="userinfo.html?userid=', data.data.studentId, '" class= "line">个人中心</a>');
        this.text('<a href="#" style="color: rgb(253, 99, 13);font-weight: bold;" id ="inform" class= "line">你有<span style="color: rgb(255, 247, 64);" class="check_num">', 3, '</span>条消息</a>');
        if (data.data.role === "SUPERMANAGER" || data.data.role === "MANAGER") {
            superflag = 1;
            this.text('<a style="color: rgb(253, 99, 13);font-weight: bold;" href="../admin/index.do">后台管理(有<span style="color: rgb(255, 247, 64);" class="check_num">', data.examnum, '</span>条活动待审核)</a>');
        }
        $(this).trigger("userlogin", [data.data]);
    } else {
        this.text('<a href="#" class= "loginclick" >登录</a>');
    }
    this.onInit(function() {
        var me = this;
        $(".backinfo").click(function(e) {
            me.exituser();
            e.preventDefault();
        });
        if (superflag === 1 && $(".check_num").text() === "") {
            this.getActionnum();
        }
        $(".loginclick").click(function(e) {
            me.show();
        })
        $("body").append('<div id="listcontent"></div>');
        this.notify();
        searchHandler();
    });
}
UserInfo.prototype.loadData = function(examnum) {
    var me = this;
    $.ajax({
        type: "GET",
        url: eDomain.getURL("user/list"),
        dataType: "json",
        cache: false,
        success: function(data) {
            data.examnum = examnum;
            $(me).trigger("loaduser", [data]);
        },
        error: function(data) {}
    });
}
UserInfo.prototype.getActionnum = function() {
    var me = this;
    $.ajax({
        type: "GET",
        url: eDomain.getURL("user/exam"),
        dataType: "json",
        cache: false,
        success: function(data) {
            if (!data.ret) {
                alert("系统出错了~~");
                return false;
            }
            me.loadData(data.data);
        },
        error: function(data) {}
    });
}

UserInfo.prototype.exituser = function() {
    var me = this;
    $.ajax({
        type: "GET",
        url: eDomain.getURL("user/exit"),
        dataType: "json",
        success: function(data) {
            debugger;
            me.loadData();
        },
        error: function(data) {}
    });
}

UserInfo.prototype.bindEvent = function(data) {
    var $dlglogin = $(".dlglogin")
    var $overlay = $(".overlay")
    var me = this;
    $(".dlglogin-close").click(function(e) {
        $dlglogin.remove()
        $(".overlay").hide()
        e.preventDefault()
    });
    $("#btn-submit").click(function(e) {
        e.preventDefault();
        if ($.trim($("#login_alias").val()) === "" || $.trim($("#login_password").val()) === "") {
            alert("请输入具体信息")
            return
        }
        $.post("userlogin.do", $(".dlglogin-form").serialize(), function(res) {
            if (res.ret) {
                me.loadData()
                $dlglogin.remove()
                $(".overlay").hide()
            } else {
                alert(res.info);
            }
        })
    })
}
UserInfo.prototype.notify = function() {
    flag = false;
    var ci = $.contentInform({
        width:'800'
    });
    var informbtn = $("#inform");
    informbtn.click(function(){
        debugger
        if (flag===false) {
            ci.open();
        }else{
            ci.close();
        }

    });
}
UserInfo.prototype.show = function() {
    var form =
        '<div class="overlay" style="display: block;"></div>' +
        '    <div class="dlglogin">' +
        '        <a href="#" class="dlglogin-close">X</a>' +
        '        <form class="dlglogin-form" action="userlogin.do" method = "post">' +
        '            <p id="legend">登录</p>' +
        '            <fieldset>' +
        '                <div class="item spec" id="alias">' +
        '                    <label for="login_alias">学号</label>' +
        '                    <input type="text" id="login_alias" name="id" class="text pop_email" tabindex="1">' +
        '                </div>' +
        '                <div class="item spec">' +
        '                    <label for="login_password">密码</label>' +
        '                    <input type="password" id="login_password" name="password" class="text" tabindex="2">' +
        '                </div>' +
        '                <div class="item recsubmit">' +
        '                    <span class="loading"></span>' +
        '                    <input id="btn-submit" value="登 录" tabindex="5">' +
        '                </div>' +
        '            </fieldset>' +
        '        </form>' +
        '        <div class="dlglogin-aside">' +
        '            <div class="dlg-notify">' +
        '                <p>注:</p>' +
        '                <ul>' +
        '                    <li>' +
        '                        <span>初始密码与自己的学号相同,登陆后可自行修改密码</span>' +
        '                    </li>' +
        '                    <li>' +
        '                       <span>Lets go提供真实的校园社交平台,只能用学号登陆，无注册功能</span>' +
        '                    </li>' +
        '                    <li>' +
        '                        <span>在登陆、使用中遇到任何问题，可与管理员联系，邮箱地址为：751143842@qq.com</span>' +
        '                    </li>' +
        '                </ul>' +
        '            </div>' +
        '        </div>' +
        '    </div>'
    $("body").append(form);
    this.bindEvent();

}

module.exports = UserInfo;