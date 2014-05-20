var actions = require('../controllers/actions')
types = require('../controllers/type'),
  users = require('../controllers/user'),
  notifieds = require('../controllers/notified'),
  lookaction = require("../controllers/lookaction"),
  comments = require('../controllers/comments'),
  auth = require('../middlewares/authorization');

module.exports = function(app) {


  app.get("/createaction.html", auth.requiresLogin, function(req, res) {
    res.render('createaction', {
      title: '创建活动页面'
    });
  });
  app.get("/adminback.html", auth.requireAdmin, function(req, res) {
    res.render('adminback', {
      title: '后台管理员页面'
    });
  });
  app.get("/action-list.html", function(req, res) {
    res.render('action-list', {
      title: '主页'
    })
  })
  app.get("/", function(req, res) {
    res.render('index', {
      title: '主页'
    })
  })
  app.get("/index.html", function(req, res) {
    res.render('index', {
      title: '主页'
    });
  });
  app.get("/action-info.html", function(req, res) {
    res.render("action-info", {
      title: "actionss"
    })
  })
  app.get("/userinfo.html", function(req, res) {
    res.render('userinfo', {
      title: '主页'
    });
  });
  //用户
  app.post("/userlogin.do", users.userlogin);
  app.post("/user/userinfo.do", users.userinfo);
  app.get("/user/isLogin.do", users.islogin);
  app.get("/user/logout.do", users.logout);
  app.post("/user/updateHeadImg.do", users.uploadpic);
  app.post("/activity/signUp.do", users.signup);
  app.post("/activity/assess.do",users.assess)
  app.post("/userActivity/enrolledUser.do", users.listuser)
  app.get("/user/showStarUser.do", users.listrankuser)
  app.post("/addpeople.do",users.addpeople)
  app.get("/listpeople.do",users.listpeople)
  app.post("/delpeople.do",users.delpeople)
  app.post("/changepid.do",users.changepid)


  //活动
  app.get("/activity/classfiyHots.do", lookaction.listAllhot)
  app.post("/activity/subclassifyHots.do", lookaction.singlelist)
  app.post("/activity/hots.do",lookaction.hotaction)
  app.post("/activity/add.do", auth.requiresLogin, actions.create);
  app.post("/fileupload/uploadImg.do", actions.uploadpic);
  app.post("/activity/add.do", actions.create);
  app.post("/activity/published.do", actions.lookpublish);
  app.post("/userActivity/enrolled.do", actions.enrolleduser)
  app.post("/activity/detail.do", actions.list);
  app.post("/userActivity/participated.do", actions.joinedaction)


  //用户中心
  app.post("/userClassify/list.do", types.getusertype);
  app.post("/userClassify/add.do", types.addtype);
  app.get("/classify/allClassifyData.do", types.listAlltype);
  app.post("/userClassify/del.do", types.deltype);
  app.post("/addstype.do",types.addsubtype)
  app.post("/delstype.do",types.delsubtype)

  //消息中心
  app.post("/data.json",notifieds.notified);
  app.post("/read.do",notifieds.read);
  app.post("/allnote.do",notifieds.allnote);
  app.post("/changenote.do",notifieds.changeAll)
  //评论
  app.post("/comment/list.do", comments.listmessage);
  app.post("/comment/add.do", comments.addmessage);



  //搜索活动
  app.post("/activity/search.do", actions.searchbykey)
  app.post("/activity/classify.do", actions.searchbyid)

  //后台管理
  app.get("/activity/notExamine/count.do",actions.countnum)
  app.post("/activity/actionlist.do",actions.actionlist)
  app.post("/activity/updateState.do",actions.updateState)
}