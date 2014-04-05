
var actions = require('../controllers/actions')
  , users = require('../controllers/user');
/*  , auth = require('./middlewares/authorization');*/

module.exports = function(app) {

  // action routes

  app.post("/fileupload/uploadImg.do",actions.uploadpic);

  app.post("/activity/add.do",actions.create);

  app.get("/createaction.html",function(req,res){
  		res.render('createaction', {
     		 title: '主dsdsssss页'
    	});
  });
}