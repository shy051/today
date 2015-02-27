var models = require("../models");

exports.addPost = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newPost = new models.Post({
		"name": req.session.email,
		"profileURL": "#",
		"pImgUrl": "img/me.jpg",
		"date": "February 13, 2015",
		"location": form_data.location,
		"imgURL": "img/c_4.jpg",
		"likes": "0",
		"description":form_data.post_description
  });

  console.log(newPost);

  newPost.save(afterSaving);

  function afterSaving(err){
    if(err){
      console.log(err);
      res.send(500);
    }
    res.status(200);
    res.redirect('/');
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}