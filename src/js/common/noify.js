var hasPaint = false;
var default_style = [
    "#remind {display: none;width: 350px;border: 1px solid #b9b9b9;height: auto;overflow: hidden;font-size: 12px;color: #333;background: #fff;clear: both;border-top: 0;border-radius: 0 0 5px 5px;box-shadow: 1px 1px 5px #ddd;}",
    "#remind h3 {height: 29px;line-height: 29px;color: #333;font-weight: bold;padding: 0 9px;border-bottom: 1px solid #e4e4e4;}",
    "#remind p {padding: 4px 5px 5px 8px;margin: 0 1px;line-height: 16px;position: relative;border-bottom: 2px solid #e4e4e4;}",
    "#remind .more {position: relative;text-align: center;height: 31px;line-height: 31px;clear: both;background: #f7f7f7;margin-top: 2px;box-shadow: 0 -1px 5px #ececec;z-index: 1;}",
    "#remind a {color: #369;text-decoration: none;}",
    ".remove{float:right;}",
    "#remind .more a {margin: 0 8px;display: inline;}"
].join('');

function contentInform(opt) {
    this.width = opt.width;
    this.initStyles();

};


contentInform.prototype.initStyles = function() {
    debugger
    if (hasPaint) return;
    var s = document.createElement("style");
    s.type = "text/css";
    var styles = default_style;
    if (s.styleSheet) {
        s.styleSheet.cssText = styles;
    } else {
        s.appendChild(document.createTextNode(styles));
    }
    document.getElementsByTagName("head")[0].appendChild(s);
    hasPaint = true;

};

contentInform.prototype.listRender = function(opt) {
    debugger
    var lists = opt.info;
    var str = "";
    for (var i = 0; i < lists.length; i++) {
        if (!lists[i].check_status) {
            str += '<p class="clearfix">' + '<span>' + lists[i].content + ' <a href="javascript::" class="remove" title="忽略">×</a></span>' + '</p>';
        };

    }
    return ['<div id="remind" data-type="listbox" style="width":', this.width, 'px;>',
        '<h3>提醒</h3>', str,
        '<div id="more" class="more">',
        '   <span><a href="" id="see_all">查看全部</a></span>',
        '<span><a href="" id="cancel_all">忽略全部</a></span>',
        '</div>',
        '</div>'].join('');
};

contentInform.prototype.getContent = function() {
    var that = this;
    $.ajax({
        url: '/data.json',
        type: 'get',
        datatype: 'json',
        success: function(res) {
            var $content = that.listRender(res);
            $("#listcontent").empty().append($content);
            $("#listcontent").show();
            $("[data-type='listbox']").show();
            that.eventBind();

        }
    });
};



contentInform.prototype.eventBind = function() {
    debugger
    var that = this;
    var listbox = $("[data-type='listbox']");

    listbox.find("#cancel_all").bind("click", function(event) {
        debugger
        that.ignoreAll();
        event.preventDefault();
    });


    $("#remind").delegate("a", "click", function() {
        debugger
        // 
        $(this).closest("p").remove();
    });

};

// 单击忽略全部
contentInform.prototype.ignoreAll = function() {
    // $.ajax({
    //  url:'', 
    //  datatype:'json', 
    //  data:'post',
    //  success:function(res){
    //      // 
    var str = "<div class='none-content' style='margin:0 70px'><div class='none'>已全部处理完,点此<a href=res.link target='_blank' title='查看历史提醒'>查看历史提醒</a></div></div>"
    $("#remind").find("p").remove();
    $("#remind").find("h3").after(str);
    //  }
    // });

};


contentInform.prototype.open = function() {
    this.getContent();
    flag = true;
};
contentInform.prototype.close = function() {
    debugger;
    $("#listcontent").hide();
    flag = false;
};



$.contentInform = function(opts) {
    return new contentInform(opts);
};