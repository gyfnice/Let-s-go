function convertdate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '/' + month + '/' + day;
}

function sectionconvert(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '/' + month + '/' + day + " " + "23:59:59"
}
var today = function() {
    var d = new Date;
    return [convertdate(d)]
};
var tomorrow = function(data) {
    var d = new Date(data + 24 * 60 * 60 * 1000);
    return d;
};
var weekend = function() {
    var weekday = [];
    d = new Date();
    var day = d.getDay(),
        satdiff = d.getDate() - day + (day == 0 ? -1 : 6),
        sundiff = d.getDate() - day + (day == 0 ? 0 : 7);
    weekday.push(sectionconvert(new Date(d.setDate(satdiff))));
    weekday.push(sectionconvert(new Date(d.setDate(sundiff))));
    return weekday
}
var lastweekend = function() {
    var lastweek = [];
    var nextDay;
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    lastweek.push(convertdate(firstday));
    lastweek.push(sectionconvert(lastday));
    for (var i = 0, max = 5; i < max; i++) {
        firstday = tomorrow(firstday.getTime());
        lastweek.push(sectionconvert(firstday));
    }
    return lastweek;
}
var Timetype = {
    type: [{
        desc: "今天",
        id: "today",
        data: today()
    }, {
        desc: "明天",
        id: "tomorrow",
        data: [convertdate(tomorrow(new Date().getTime()))]
    }, {
        desc: "周末",
        id: "weekend",
        data: weekend()
    }, {
        desc: "最近一周",
        id: "lastweek",
        data: lastweekend()
    }, {
        desc: "选择日期",
        id: "selectdate",
        data: []
    }]
};

function ListType() {
    ListType.superclass.constructor.apply(this, arguments);
}

$jex.extendClass(ListType, XControl);
ListType.prototype.update = function(data) {
    this.insertBody(data);
    this.onInit(function(e) {
        $(this).trigger("rendercompletelist");
    });
};
ListType.prototype.insertBody = function(data) {
    this.insertItem(data.data, data.itemid, data.itemsid);
    for (var i = 0, max = data.data.length; i < max; i++) {
        if (data.data[i].id == data.itemid) {
            this.insertItemlist(data.data[i].child, data.itemid, data.itemsid);
        }
    }
    this.insertTime(Timetype.type);
};
ListType.prototype.insertItem = function(data, id, sid) {
    this.text('<div class="type-nav__item clearfix">');
    this.text('     <label class="type-nav__title">类型</label>');
    this.text('     <ul class="type-nav__name">');
    for (var i = 0, max = data.length; i < max; i++) {

        if (data[i].id === id) {
            this.text('  <li class="on">');
            this.text('      <a href="action-list.html?id=', data[i].id, '">', data[i].name, '</a>');
            this.text('  </li>');
        } else {
            this.text('  <li>');
            this.text('      <a href="action-list.html?id=', data[i].id, '">', data[i].name, '</a>');
            this.text('  </li>');
        }
    }
    this.text('     </ul>');
    this.text('</div>');
};
ListType.prototype.insertTime = function(data) {
    this.text('<div class="type-nav__item clearfix">');
    this.text('     <label class="type-nav__title">时间</label>');
    this.text('         <ul class="type-nav__time clearfix">');
    this.text('             <li class="on">');
    this.text('                 <a data-val="all" href="#">全部</a>');
    this.text('             </li>');
    for (var i = 0, max = data.length; i < max; i++) {
        this.text('         <li>');
        this.text('              <a class="', data[i].id, '" data-val="', data[i].data.join(","), '" href="#">', data[i].desc, '</a>');
        this.text('         </li>');
    }
    this.text('         </ul>');
    this.text('</div>');
};
ListType.prototype.insertItemlist = function(data, id, sid) {
    this.text('<div class="type-nav__item">');
    this.text('<ul id="type-nav__sec" class="type-nav__subsec clearfix">');
    if (sid === "none") {
        this.text('     <li class="on">');
        this.text('         <a href="action-list.html?id=', id, '">全部</a>');
        this.text('     </li>');
    } else {
        this.text('     <li>');
        this.text('         <a href="action-list.html?id=', id, '">全部</a>');
        this.text('     </li>');
    }

    for (var i = 0, max = data.length; i < max; i++) {
        if (data[i].id === sid) {
            this.text('     <li class="on">');
            this.text('         <a href="action-list.html?id=', id, '&sid=', data[i].id, '">', data[i].subName, '</a>');
            this.text('     </li>');
        } else {
            this.text('     <li>');
            this.text('         <a href="action-list.html?id=', id, '&sid=', data[i].id, '">', data[i].subName, '</a>');
            this.text('     </li>');
        }
    }
    this.text('</ul>');
    this.text('</div>');
};
ListType.prototype.loadData = function(id, sid) {
    var me = this;
    $.ajax({
        type: "GET",
        url: eDomain.getURL("type/list"),
        dataType: "json",
        success: function(data) {
            if (!data.ret) {
                alert(data.errmsg);
                return false;
            }
            $(me).trigger("loadtypelist", [data, id, sid]);
        },
        error: function(data) {

        }
    });
};
module.exports = ListType;