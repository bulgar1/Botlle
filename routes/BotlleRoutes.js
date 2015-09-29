var mongoose = require('mongoose');
var Botlle = mongoose.model('Botlle');
var express = require('express');
var router = express.Router();
var BotlleComment = mongoose.model('BotlleComment');
var jwt = require("express-jwt");
var User = mongoose.model('User');


var auth = jwt({
	secret: "_secret_sauce",
	userProperty: "payload"
})

router.use('/', function (req, res, next){
	console.log('in middle ware line 14')
	next();
})

router.param('id', function (req, res, next, id) {
	// console.log('in params function')
	// console.log(id);
	Botlle.findOne({_id:id}).populate([{path:'comments'}, {path: 'user'}]).exec(function (err, botlle){
		// console.log('this is the botlle ' + botlle)
		req.botlle = botlle
		next();
	})

});
router.post('/delete/:id', auth, function (req, res){
	// console.log('tyring to delete pin in server')
	Botlle.update({_id: req.params.id}, {deleted: false}, function (err, response){
		res.send();
	})

})

router.post('/:id', auth, function(req, res){
	// console.log('inside edit pin function in server line 34')
	// console.log(req.body)
	Botlle.update({_id: req.params.id}, req.body, function (err, response){
		// console.log(response);
		res.send();
	})
})

router.post('/add/:id', auth, function (req, res) {
  // console.log('trying to add to likes')
  var botlle_id = req.params.id
  console.log(botlle_id)
	  Botlle.findOne({_id: botlle_id}, function (err, response) {
	  	// console.log(response)
	  	var updatedLikes = response.likes
	  	// console.log(updatedLikes)
	  	//check ----
	  	updatedLikes = updatedLikes + 1
	  	Botlle.update({_id: response.id}, {likes: updatedLikes}, function (err, likes) {
	  		res.send()
	  	})
	  })
})

router.post('/sub/:id', auth, function (req, res) {
  // console.log('trying to add to likes')
  var botlle_id = req.params.id
  console.log(botlle_id)
	  Botlle.findOne({_id: botlle_id}, function (err, response) {
	  	// console.log(response)
	  	var updatedLikes = response.likes
	  	// console.log(updatedLikes)
	  	updatedLikes = updatedLikes - 1
	  	Botlle.update({_id: response.id}, {likes: updatedLikes}, function (err, likes) {
	  		res.send()
	  	})
	  })
})

router.post('/', function (req, res){
	console.log(req.body)
	var botlle = new Botlle(req.body)
	botlle.save(function(err, response){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!response) return res.status(400).send({err: "Could not create that botlle."});
		// console.log('------------------------------')
		console.log(response.user);
		User.update({_id: response.user}, 	{$push:

												{
													botlles: {
														_id: response._id
													}
												}
					}, function (err, user){
						if(err) return res.status(400).send({err: 'The client fuced up'});
						if(!user) return res.status(500).send({err: 'the server could not find a user'});
						console.log('found user ' + user + 'line 51');
						res.send()
					})
		// console.log('made it')
		// res.send({_id: response._id});
	})
})

router.get('/', function (req, res){
	Botlle.find({})
	.exec(function (err, botlles) {
		// console.log(botlles)
		if(err) return res.status(500).send({err: "error getting all botlles"});
		if(!botlles) return res.status(500).send({err: "botlles do not exist"});
		res.send(botlles);
	});
})

router.get('/:id', function (req, res){
		res.send(req.botlle)
})





module.exports = router;
