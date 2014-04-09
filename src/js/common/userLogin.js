function UserLogin() {

}

UserLogin.prototype.bindEvent = function(data) {
    var $dlglogin = $(".dlglogin")
    var $overlay = $(".overlay")
    $(".dlglogin-close").click(function(e) {
        $dlglogin.remove()
        $(".overlay").hide()
        e.preventDefault()
    });
    $("#btn-submit").click(function(e){
        e.preventDefault();

        $.post("userlogingyf.do",$(".dlglogin-form").serialize(),function(res){
            if(res.ret){

            }
        })
    })
}
UserLogin.prototype.show = function() {
    var form =
        '<div class="overlay" style="display: block;"></div>' +
        '    <div class="dlglogin">' +
        '        <a href="#" class="dlglogin-close">X</a>' +
        '        <form class="dlglogin-form" action="userlogingyf.do" method = "post">' +
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
module.exports = new UserLogin