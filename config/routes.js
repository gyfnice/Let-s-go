
var actions = require('../controllers/actions')
	types = require('../controllers/type')
  , users = require('../controllers/user')
  , auth = require('../middlewares/authorization');

module.exports = function(app) {

  // action routes

  app.post("/fileupload/uploadImg.do",actions.uploadpic);

  app.post("/activity/add.do",actions.create);

  app.get("/classify/allClassifyData.do",types.listAlltype);
  app.get("/createaction.html",auth.requiresLogin,function(req,res){
  		res.render('createaction', {
     		 title: '主页'
    	});
  });
  app.get("/index.html",function(req,res){
      res.render('index', {
         title: '主页'
      });
  });
  app.get("/userinfo.html",function(req,res){
      res.render('userinfo', {
         title: '主页'
      });
  });
  //用户
  app.post("/userlogin.do",users.userlogin);
  app.get("/user/isLogin.do",users.islogin);
  app.get("/user/logout.do",users.logout);

  //活动
  app.post("/activity/add.do",auth.requiresLogin,actions.create);


  //用户中心
  app.post("/userClassify/list.do",types.getusertype);
}