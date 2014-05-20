function boardtype() {
    boardtype.superclass.constructor.apply(this, arguments);
}

$jex.extendClass(boardtype, XControl);
boardtype.prototype.update = function(data) {
    this.insertBody(data);
    this.onInit(function () {
        var me = this;
        $(".typesubmit").click(function (e) {
            debugger;
            e.preventDefault();
            $.ajax({
                url:"addstype.do",
                type:"post",
                data:{
                    id:$(this).parent().parent().parent().find("h5 a").data("uid"),
                    sid:$(this).parent().parent().parent().find("input").val()
                },
                success:function (res) {
                    if(!res.ret){
                        alert("添加的分组已经存在")
                    }
                    me.loadboardtype();
                }
            })
        })
        $(".deltype").click(function (e) {
            e.preventDefault();
            $.ajax({
                url:"delstype.do",
                type:"post",
                data:{
                    id:$(this).parent().parent().parent().find("h5 a").data("uid"),
                    sid:$(this).parent().parent().parent().find("input").val()
                },
                success:function (res) {
                    if(!res.ret){
                        alert("你所删除的分组不存在")
                    }
                    me.loadboardtype();
                }
            })  
        })
    })
}
boardtype.prototype.insertBody = function(data) {
    for (var i = 0, max = data.length; i < max; i++) {
        if(i === max - 1){
            this.text('<li class="categories c-last">');
        }else{
            this.text('<li class="categories">');
        }
        this.text('   <h5>');
        this.text('       <a data-uid="',data[i]._id,'" href="action-list.html?id=',data[i]._id,'">',data[i].name, '»</a>');
        this.text('   </h5>');
        this.text('   <ul>');
        this.insertlist(data[i].child,data[i],data);
        this.text('   </ul>');
        this.text('</li>');
    }
}
boardtype.prototype.insertlist = function(data,parent,node) {
    for (var i = 0, max = data.length; i < max; i++) {
        if(data[i].state){    
            this.text('       <li>');
            this.text('<div class="closetype hidden" ><a href="#" id="',data.type_id,'">x</a></div>');
            this.text('           <a data-usid="',data[i]._id,'" href="action-list.html?id=', parent.id, '&sid=',data[i]._id,'">', data[i].subName, '</a>');
            this.text('       </li>');
        }
    }
    if(node.admin)
        this.text('<li><input class="typevalue" type="text" /><button class="typesubmit">提交</button><button class="deltype">删除</button></li>')
}

boardtype.prototype.loadboardtype = function() {
    var me = this;
    $.ajax({
        type: "GET",
        url: eDomain.getURL("type/list"),
        dataType: "json",
        success: function(data) {
            $(me).trigger("loadboard",[data.data]);
        },
        error: function(data) {

        }
    });
};
boardtype.prototype.loadData = function(data){
    $(this).trigger("loadboard",[data]);
}
module.exports = boardtype;