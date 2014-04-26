var hasPaint = false;
var Userpage = require('com/Page.js');
var messagepage = new Userpage({
    elemId: "pagelist"
});

$(messagepage).bind("loadlistpage", function(e, page, currentpage) {
    var data = {
        totalpage: page,
        currentpage: currentpage
    };
    messagepage.clear();
    messagepage.updateSource(data);
    messagepage.render();
});
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
            str += '<p class="clearfix">' + '<span>' + lists[i].content + ' <a data-nid="' + lists[i]._id + '" href="javascript::" class="remove" title="忽略">×</a></span>' + '</p>';
        };

    }
    return ['<div id="remind" data-type="listbox" style="width":', this.width, 'px;>',
        '<h3>提醒</h3>', str,
        '<div class="page-list">',
        '    <ul id="pagelist">',
        '    </ul>',
        '</div>',
        '<div id="more" class="more">',
        '<span><a href="" id="cancel_all">忽略全部</a></span>',
        '</div>',
        '</div>'].join('');
};

contentInform.prototype.getContent = function(id, page) {
    var that = this;
    $.ajax({
        url: '/data.json',
        type: 'post',
        data: {
            id: id,
            page: page
        },
        success: function(res) {
            var $content = that.listRender(res);
            $("#listcontent").empty().append($content);
            $("#listcontent").show();
            $("[data-type='listbox']").show();
            $(messagepage).trigger("loadlistpage", [res.pageNum, page]);
            that.eventBind();
        }
    });
};



contentInform.prototype.eventBind = function() {
    var that = this;
    var listbox = $("[data-type='listbox']");
    $("#pagelist").delegate("a", "click", function(e) {
        e.preventDefault();
        var id = $(".u-name").prop("href").match(/=\d+/)[0].slice(1);
        that.getContent(id, parseInt($(e.target).text()));
    });
    $("#remind").delegate("a", "click", function() {
        var that = this;
        $.ajax({
            url: '/read.do',
            type: 'POST',
            data: {
                id: $(this).data("nid")
            },
            success: function(res) {
                debugger;
                var num = $(".check_num").text();
                $(".check_num").text(--num)
                $(that).closest("p").remove();
            }
        });
    });

    $("body").click(function(e) {
        if (!$(e.target).closest("#listcontent").length) {
            that.close()
        }
    });

    $("#cancel_all").click(function(e) {
        e.preventDefault();
        var uid = $(".u-name").prop("href").match(/=\d+/)[0].slice(1);
        var me = this;
        $.ajax({
            type: "post",
            url: "/changenote.do",
            data: {
                id: uid
            },
            success: function(res) {
                $(".check_num").text(0)
                that.ignoreAll();
            }
        })
    })
};

// 单击忽略全部
contentInform.prototype.ignoreAll = function() {
    // $.ajax({
    //  url:'', 
    //  datatype:'json', 
    //  data:'post',
    //  success:function(res){
    //      // 
    $("#remind").find(".none-content").remove();
    var str = "<div class='none-content' style='margin:0 70px'><div class='none'>已全部处理完</div></div>"
    $("#remind").find("p").remove();
    $("#remind").find("h3").after(str);
    //  }
    // });

};


contentInform.prototype.open = function() {
    var id = $(".u-name").prop("href").match(/=\d+/)[0].slice(1);
    this.getContent(id, 1);
    flag = true;
};
contentInform.prototype.close = function() {
    $("#listcontent").hide();
    flag = false;
};



$.contentInform = function(opts) {
    return new contentInform(opts);
};