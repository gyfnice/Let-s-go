
var actions = require('../controllers/actions')
	types = require('../controllers/type')
  , users = require('../controllers/user');
/*  , auth = require('./middlewares/authorization');*/

module.exports = function(app) {

  // action routes

  app.post("/fileupload/uploadImg.do",actions.uploadpic);

  app.post("/activity/add.do",actions.create);

  app.get("/classify/allClassifyData.do",types.listAlltype);
  app.get("/createaction.html",function(req,res){
  		res.render('createaction', {
     		 title: '主页'
    	});
  });
  app.get("/index.html",function(req,res){
      res.render('index', {
         title: '主页'
      });
  });
  app.post("/userlogin.do",users.userlogin);
  app.get("/user/isLogin.do",users.islogin);
  app.get("/user/logout.do",users.logout);
}