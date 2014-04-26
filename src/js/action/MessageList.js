function MessageList() {
    MessageList.superclass.constructor.apply(this, arguments);
}
var goTop = function() {
    $("html, body").animate({
        scrollTop: 600
    }, 110);
}
$jex.extendClass(MessageList, XControl);
MessageList.prototype.update = function(data) {
    debugger;
    for (var i = 0, max = data.data.length; i < max; i++) {
        this.insertmessage(data.data[i]);
    }
    if(data.data.length === 0){
        this.text('<div class="no-message">活动目前还没有留言</div>');
    }
}
MessageList.prototype.insertmessage = function(data) {
    this.text('<li class="message-item1">');
    this.text('     <a href="#" class="user-img">');
    this.text('         <img src="', eDomain.getURL("img/headimg")+data.headImg, '" alt="', data.userName, '">');
    this.text('     </a>');
    this.text('     <div class="single-info bd">');
    this.text('         <p class="user-name">');
    this.text('             <span class="mdate">', data.commentDate, '</span>');
    this.text('             <span class="mtime">', data.commentTime, '</span>');
    this.text('             <span class="mname">', data.userName, '</span>');
    this.text('         </p>');
    this.text('         <p class="umessage">', data.content, '</p>');
    this.text('     </div>');
    this.text('</li>');
}
MessageList.prototype.loadData = function(actionid, page) {
    var me = this;
    $.ajax({
        type: "POST",
        url: eDomain.getURL("message/list"),
        dataType: "json",
        cache : false,
        data: {
            id: actionid,
            page: page
        },
        success: function(data) {
            if(!data.ret){
                alert(data.errmsg);
                return false;
            }
            var totalpage = Math.ceil(parseInt(data.pageNum, 10));
            $(me).trigger("loadmessagelist", [data, totalpage, page]);
        },
        error: function(data) {

        }
    });
}
MessageList.prototype.successsay = function() {
    $(".write-comment").prepend('<div class="suctip">留言成功</div>');
    $(".suctip").show();
    $(".suctip").fadeOut("slow",function(e){
        goTop();
    });
}
MessageList.prototype.postData = function(actionid, userid, content,name) {
    var me = this;
    var datas = {
        "actionid": actionid,
        "userid": userid,
        "content": content,
        "actionname":name,
        "actionuserid":$(".action-author").find("a").prop("href").match(/=\d+/)[0].slice(1)
    };
    $.ajax({
        type: "POST",
        url: eDomain.getURL("message/add"),
        data: datas,
        success: function(data) {
            me.successsay();
            me.loadData(actionid, 1);
        },
        error: function(data) {
            
        }
    });
}

module.exports = MessageList;