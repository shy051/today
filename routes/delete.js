exports.deleteProject = function(req, res) {
  var postID = req.params.id;

  models.Post
    .find({"_id": postID})
    .remove()
    .exec(afterRemoving);

    function afterRemoving(err){
      if(err) console.log(err);
      res.send(200);
    }
}