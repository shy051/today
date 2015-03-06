var models = require("../models");
var fs = require('fs');

exports.updateProf = function(req, res){
  sess=req.session;
  if(sess.username){
    var tmp_path = req.files.image.path;
    console.log("File size " + req.files.image.size);
    var fileName;
    var changePicture=false;
    var changePost=false;
    var form_data = req.body;

    if(req.files.image.size != 0){
      var target_path = './public/uploads/' + req.files.image.name;
      fileName = req.files.image.name;
      changePicture=true;
      fs.rename(tmp_path, target_path, function(err){
        if (err) throw err;
        fs.unlink(tmp_path, function(){
          if(err) throw err;
          console.log("file uploaded!")
          models.Post.update({name: sess.username}, {"pImgUrl": "uploads/"+fileName}, afterPostUp);
	    	function afterPostUp(err, results){
	    		if (err) throw err;
	    	}
        })
      });
    }

    if(form_data.profile_desc.length != 0){
    	changePost = true;
    }
     

    if(req.files.image.size != 0){
    	console.log("in the first loop!");
    	if(form_data.profile_desc.length != 0){
    		console.log("change desc and picture");
		    models.User.update({username: sess.username}, {imgSrc: "uploads/"+fileName, description: form_data.profile_desc}, afterUpdating);
		    function afterUpdating(err){
		    	if (err) throw err;
	    		res.status(200);
	        	res.redirect('/profile');
	        }
		}
		else{
			console.log("just change image");
		    models.User.update({username: sess.username}, {imgSrc: "uploads/"+fileName}, afterUpdating);
		    function afterUpdating(err){
		    	if (err) throw err;
	    		res.status(200);
	        	res.redirect('/profile');
		    }
		}
	}
	else{
		if(form_data.profile_desc.length != 0){
    		console.log("change desc only");
		    models.User.update({username: sess.username}, {description: form_data.profile_desc}, afterUpdating);
		    function afterUpdating(err){
		    	if (err) throw err;
		    	res.status(200);
		        res.redirect('/profile');
		    }
		}
		else{
			res.status(200);
	        res.redirect('/profile');
		}
	}
  
      
  }
  else{
    res.render('login',models);
  }
}