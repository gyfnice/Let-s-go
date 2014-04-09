function UserLogin() {
    UserLogin.superclass.constructor.apply(this, arguments);
}

$jex.extendClass(FinalStep, XControl);
UserLogin.prototype.update = function(data) {
    this.insertContent();
    this.onInit(function(e) {
        var $dlglogin = $(".dlglogin");
        var $overlay = $(".overlay");
        $(".dlglogin-close").click(function(e){
            $dlglogin.hide();
            $(".overlay").hide();
        });
    });
}
UserLogin.prototype.insertContent = function() {
    this.text('<div class="overlay" style="display: block;"></div>');
    this.text('    <div class="dlglogin">');
    this.text('        <a href="#" class="dlglogin-close">X</a>');
    this.text('        <form class="dlglogin-form">');
    this.text('            <p id="legend">登录</p>');
    this.text('            <fieldset>');
    this.text('                <div class="item spec" id="alias">');
    this.text('                    <label for="login_alias">学号</label>');
    this.text('                    <input type="text" id="login_alias" name="id" class="text pop_email" tabindex="1">');
    this.text('                </div>');
    this.text('                <div class="item spec">');
    this.text('                    <label for="login_password">密码</label>');
    this.text('                    <input type="password" id="login_password" name="password" class="text" tabindex="2">');
    this.text('                </div>');
    this.text('                <div class="item recsubmit">');
    this.text('                    <span class="loading"></span>');
    this.text('                    <input type="submit" id="btn-submit" value="登 录" tabindex="5">');
    this.text('                </div>');
    this.text('            </fieldset>');
    this.text('        </form>');
    this.text('        <div class="dlglogin-aside">');
    this.text('            <div class="dlg-notify">');
    this.text('                <p>注:</p>');
    this.text('                <ul>');
    this.text('                    <li>');
    this.text('                        <span>初始密码与自己的学号相同,登陆后可自行修改密码</span>');
    this.text('                    </li>');
    this.text('                    <li>');
    this.text('                       <span>Lets go提供真实的校园社交平台,只能用学号登陆，无注册功能</span>');
    this.text('                    </li>');
    this.text('                    <li>');
    this.text('                        <span>在登陆、使用中遇到任何问题，可与管理员联系，邮箱地址为：751143842@qq.com</span>');
    this.text('                    </li>');
    this.text('                </ul>');
    this.text('            </div>');
    this.text('        </div>');
    this.text('    </div>');
}
module.exports = UserLogin;