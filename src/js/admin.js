require('com/jquery');
require("com/config");
var boardtype = require('./home/boardtype');

var Actionlist = require('admin/Actionlist');
var ActionPage = require('com/Page.js');
var storequery = {state:false};

var actionlist = new Actionlist({
    elemId: "items"
});
var actionpage = new ActionPage({
    elemId: "pagelist"
});
var boardtype = new boardtype({
    elemId: "board-type"
});
var EventControl = {};

EventControl.bind = function () {
    $(actionlist).bind("loadActionlist",function (e,data,page,totalpage) {
        actionlist.clear();
        actionlist.updateSource(data.data);
        actionlist.render();
        $(".controlnum").hide();
        $(actionpage).trigger("loadlistpage", [totalpage, page]);
    })
    $(actionpage).bind("loadlistpage", function(e, page, currentpage) {
        var data = {
            totalpage: page,
            currentpage: currentpage
        };
        actionpage.clear();
        actionpage.updateSource(data);
        actionpage.render();
    });
    $(boardtype).bind("loadboard", function(e, data) {
        data.admin = true;
        debugger;
        boardtype.clear();
        boardtype.updateSource(data);
        boardtype.render();
    });
}
var goTop = function() {
    $("html, body").animate({
        scrollTop: 0
    }, 110);
}
function bindEvent() {
    clickNavMenu();
    clickNavstate();
    clickPagelist();
    addpeople();
    delpeople()
}
function clickNavMenu() {
    $(".nav-tag li").click(function (e) {
        $(this).addClass("tag-active");
        debugger;
        $(this).siblings().removeClass("tag-active");
        switch($(this).data("navname")){
            case "auth":
                authManager();
                break
            case "classifys":
                classifyManger();
                break
            case "checkaction":
                $(".head-bar").show();
                $(".th-items").show();
                $("#pagelist").show();
                $(".site-aside").show();
                $(".people").hide();
                $(".board-list").hide();
                actionlist.loadData(storequery,1)
                break
        }
    });
}
function classifyManger(){
    $(".head-bar").hide();
    $(".th-items").hide();
    $("#pagelist").hide();
    $(".site-aside").hide();
    $(".people").hide();
    $(".board-list").show();
}
function authManager() {
    $(".head-bar").hide();
    $(".th-items").hide();
    $("#pagelist").hide();
    $(".site-aside").hide();
    $(".board-list").hide();
    $(".people").show();

}
var loadboardtype = function() {
    $.ajax({
        type: "GET",
        url: eDomain.getURL("type/list"),
        dataType: "json",
        success: function(data) {
            Catchtype = data;
            boardtype.loadData(data.data);
        },
        error: function(data) {

        }
    });
};
function loadpeoplelist() {
    $.ajax({
        url:"listpeople.do",
        type:"get",
        success:function (res) {
            var pli="";
            for(var i = 0,max = res.length;i < max;i++){
                    pli+= "<p>"+res[i].userName+"<span data-uid='"+res[i].studentId+"' style='cursor:pointer' class='delpeo'>  X</span></p>"
            }
            $(".peoplelist").html(pli);
        }
    })
}
function delpeople() {
    $(".peoplelist").delegate("span","click",function(e){
        $.ajax({
            url:"delpeople.do",
            type:"post",
            data:{
                id:$(this).data("uid")
            },
            success:function (res) {
                loadpeoplelist();
            }
        })
    })
}
function addpeople() {
    loadpeoplelist();
    $(".pbtn").click(function (e) {
        e.preventDefault();
        $.ajax({
            url:"addpeople.do",
            type:"post",
            data:{
                name:$(".addpeo").val(),
                pid:$(".password").val()
            },
            success:function(res){
                alert(res.info);
                loadpeoplelist();
            }
        })
    })
}

function clickPagelist(){
    $("#pagelist").delegate("a", "click", function(e) {
        e.preventDefault();
        actionlist.loadData(storequery, parseInt($(e.target).text(), 10));
        goTop();
    });
}
function clickNavstate() {
    $(".head-bar a").click(function (e) {
        e.preventDefault();
        $(this).addClass("btn-active");
        $(this).siblings().removeClass("btn-active");
        switch($(this).data("nav")){
            case "all":
               actionlist.loadData({},1);storequery = {};
               break;
            case "uncheck":
               actionlist.loadData({state:false},1);storequery = {state:false};
               break;
            case "success":
               actionlist.loadData({state:true,passState:true},1); 
               storequery = {state:true,passState:true};
               break;
            case "fail":
               actionlist.loadData({state:true,passState:false},1)
               storequery = {state:true,passState:false};
               break;
        }
    })
}
function init() {
    loadinfo();
    EventControl.bind();
    bindEvent();
    $(".people").hide();
    $(".classifypage").hide();
    $(".board-list").hide();
}

function loadinfo() {
    $.get("/user/isLogin.do",function (res) {
        $(".user-name").text(res.data.userName);
        $(".user-name").prop("title",res.data.userName)
    })
    allActioninfo();
    loadboardtype();
}

function allActioninfo() {
    actionlist.loadData({state:false},1);
}
init();