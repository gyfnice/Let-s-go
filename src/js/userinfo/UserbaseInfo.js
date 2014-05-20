var Followtype = require('Followtype');
var followlist = new Followtype();
function UserbaseInfo() {
    UserbaseInfo.superclass.constructor.apply(this, arguments);
}

$jex.extendClass(UserbaseInfo, XControl);
UserbaseInfo.prototype.update = function(data) {
    debugger;
    var userinfo = data.data;
    var ftype = data.followtype;
    this.text('<a href="userinfo.html?userid=',userinfo.studentId,'" class="info-img">');
    this.text('     <img src="',eDomain.getURL("img/headimg")+userinfo.headImg,'" alt="',userinfo.userName,'">');
    this.text('</a>');
    this.text('<div class="info-info bd">');
    this.text('     <h3 class="info-name">');
    this.text('         <a href="userinfo.html?userid=',userinfo.studentId,'">',userinfo.userName,'</a><span class="fa fa-heart"><span class="info-score">',userinfo.totalScore,'</span></span>');
    this.text('     </h3>');
    this.text('     <p class="info-score">');
    this.text('         <span>积分: </span><span class="date">',userinfo.totalScore,'</span>');
    this.text('     </p>');
    this.text('     <p class="info-fee"><span >邮箱:  </span><span class="email">',userinfo.email,'</span> <span class="changpid hidden" style="cursor:pointer">更改密码 </span><input type="text" placeholder="输入你需要更改的密码" class="hid hinput hidden" /><input type="button" class="hid hidden" id="yes" value="确定"/></p>');
    this.text('     <p class="info-author">');
    this.text('         <span>已关注</span>');
    this.text('         <ul class="user-type" id="followlist">');
    followlist.clear();
    followlist.updateSource(ftype);
    this.append('',followlist,'');
    this.text('         </ul>');
    this.text('     <div class="btn-add hidden"><a href="#" id="addbtntype">添加分组</a></div>');
    this.text('     </p>');
    this.text('</div>');
    this.onInit(function(){
        $(this).trigger("completeinfo",[userinfo.studentId]);
        $(".changpid").click(function (e) {
            $(".hid").toggle()
            $("#yes").click(function (e) {
                e.preventDefault()
                var me = this;
                var paid = $(".hinput").val()
                if(!paid){
                    alert("请输入密码")
                    return
                }
                $.post("changepid.do",{
                    pid:paid
                },function (res) {
                    alert("更改密码成功")
                    $(".hid").hide()
                    $(me).unbind();
                })
            })
        })
    });
};
UserbaseInfo.prototype.loadData = function(uid,followlist) {
    var me = this;
    $.ajax({
        type: "POST",
        url: eDomain.getURL("usercenter/baseinfo"),
        dataType: "json",
        cache:false,
        data:{
            userId:uid
        },
        success: function(data) {
            if(!data.ret){
                alert(data.errmsg);
                return false;
            }
            data.followtype = followlist;
            $(me).trigger("loaduserinfo", [data]);
        },
        error: function(data) {

        }
    });
};

module.exports = UserbaseInfo;