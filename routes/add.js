var models = require("../models");
var fs = require('fs');

exports.addPost = function(req, res) {
  sess=req.session;
  if(sess.username){
    var tmp_path = req.files.image.path;
    console.log("File size " + req.files.image.size);
    var fileName;

    if(req.files.image.size != 0){
      var target_path = './public/uploads/' + req.files.image.name;
      fileName = req.files.image.name;
      fs.rename(tmp_path, target_path, function(err){
        if (err) throw err;
        fs.unlink(tmp_path, function(){
          if(err) throw err;
          console.log("file uploaded!")
        })
      });
    }
    else{
      fileName = "default.jpeg";
    }
      

    var form_data = req.body;

    models.User.findOne({username : req.session.username}, 'username imgSrc', function(err, user){
      var newPost = new models.Post({
        "name": req.session.username,
        "title": form_data.title,
        "profileURL": "#",
        "pImgUrl": user.imgSrc,
        "date": new Date(),
        "location": form_data.location,
        "imgURL": "uploads/"+fileName,
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
    });
      
  }
  else{
    res.render('login',models);
  }
}