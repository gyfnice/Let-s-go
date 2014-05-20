function Actionlist() {
    Actionlist.superclass.constructor.apply(this, arguments);
}
$jex.extendClass(Actionlist, XControl);
Actionlist.prototype.update = function(data) {
    for (var i = 0, max = data.length; i < max; i++) {
        debugger
        if (data[i].state && data[i].passState) {
            this.text('<li data-id="', data[i]._id, '" class="item item-pass bd">');
        } else if (data[i].state && !data[i].passState) {
            this.text('<li data-id="', data[i]._id, '" class="item item-deny bd">');
        } else {
            this.text('<li data-id="', data[i]._id, '" class="item bd">');
        }
        this.text('<div class="item__face">');
        this.text('     <a href="#"></a>');
        this.text('</div>');
        this.text('<div class="item__content bd" node-type="content">');
        this.text('     <div class="item__head clear">');
        this.text('         <a target=_blank href="action-info.html?actionid=', data[i]._id, '" class="item__title left">', data[i].title, '</a>');
        this.text('         <ul class="item__dir left clear">');
        this.text('             <li>', data[i].endTime, '</li>');
        this.text('             <li>', data[i].startTime, '</li>');
        this.text('             <li>', data[i].username, '</li>');
        this.text('             <li>', data[i].place, '</li>');
        this.text('             <li>', data[i].classifyname, '</li>');
        this.text('             <li>', data[i].subname, '</li>');

        this.text('         </ul>');
        this.text('     </div>');
        this.text('     <div class="item__hint clear">');
        this.text('          <div class="infobar">');
        this.text('             <a data-state="true" href="#" class="infoPass">Pass</a>');
        this.text('             <div class="denny inlineblock"></div>');
        this.text('             <a data-state="false" href="#" class="infoDeny">Deny</a>');
        this.text('         </div>');
        this.text('         <ul class="item__list bd clear">', data[i].description, '</ul>');
        this.text('     </div>');
        this.text('</div>');
        this.text('</li>');
    }
    if (data.length === 0) {
        this.text("没有信息~");
    }

    this.onInit(function() {
        var me = this;
        var callback = function(e) {
            e.preventDefault();
            var id = $(this).closest("li").data("id");
            var astate = $(this).data("state");
            var me = this;
            $.ajax({
                type: "POST",
                url: "/activity/updateState.do",
                cache: false,
                data: {
                    aid: id,
                    state: astate
                },
                success: function(res) {
                    var currentli = $(me).closest("li")
                    if (astate) {
                        currentli.addClass("item-pass")
                        currentli.removeClass("item-deny")
                    } else {
                        currentli.addClass("item-deny")
                        currentli.removeClass("item-pass")
                    }
                }
            })
        }
        $(".infoPass").click(callback)
        $(".infoDeny").click(callback)
    });
}
Actionlist.prototype.loadData = function(type, page, totalpage) {
    var me = this;
    $.ajax({
        type: "POST",
        url: "/activity/actionlist.do",
        dataType: "json",
        cache: false,
        data: {
            query: type,
            page: page
        },
        success: function(data) {
            debugger;
            if (!data.ret) {
                alert(data.errmsg);
                return false;
            }
            var totalpage = parseInt(data.pageNum, 10);
            $(me).trigger("loadActionlist", [data, page, totalpage]);
        },
        error: function(data) {

        }
    });
}

module.exports = Actionlist;