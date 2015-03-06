var models = require("../models");
var fs = require('fs');

exports.addPost = function(req, res) {
  sess=req.session;
  if(sess.username){
    var tmp_path = req.files.image.path;

    var target_path = './public/uploads/' + req.files.image.name;
    fs.rename(tmp_path, target_path, function(err){
      if (err) throw err;
      fs.unlink(tmp_path, function(){
        if(err) throw err;
        console.log("file uploaded!")
      })
    });
      

    var form_data = req.body;
    // console.log("the form data is as follows:");
    // console.log(form_data);
    // console.log(req.files);

    var newPost = new models.Post({
      "name": req.session.username,
      "title": form_data.title,
      "profileURL": "#",
      "pImgUrl": "img/me.jpg",
      "date": new Date(),
      "location": form_data.location,
      "imgURL": "uploads/"+req.files.image.name,
      "likes": "0",
      "description":form_data.post_description
    });

    //console.log(newPost);

    newPost.save(afterSaving);

    function afterSaving(err){
      if(err){
        console.log(err);
        res.send(500);
      }
      else{
        models.User.update({username: req.session.username}, {$inc: {stories : 1}}, afterUser);
        function afterUser(err){
          if(err) throw err;
          res.status(200);
          res.redirect('/most_recent');
        }
      }
      //res.redirect('/');
    }
  }
  else{
    res.render('login',models);
  }
}