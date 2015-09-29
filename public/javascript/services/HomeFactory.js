(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q', '$rootScope'];

	function HomeFactory($http, $q, $rootScope) {
		var o = {};
		o.botlle = {}
		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}
		o.CreateNewBotlle = function(botlle){
			var q = $q.defer();

			botlle.user = $rootScope._user.id
			console.log(botlle)

			// pin.user = $rootScope.user.id
			// console.log('this is user id'  + pin.user)
			// console.log('creating new pin line 13')
			$http.post('/botlle', botlle, getAuth()).success(function(res){
				q.resolve();
			})
			return q.promise;
		}

		o.getBotlles = function(){
			var q = $q.defer();
			console.log('inside homefactory')
			$http.get('/botlle')
			.success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.getBotlle = function(id){
			console.log(id);
			var q = $q.defer();
			console.log('in side get Botlle in homefactory')
			$http.get('/botlle/' +  id, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/comments', comment, getAuth()).success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		}
		o.deleteComment = function(id){
			var q = $q.defer();
			$http.delete('/comments/' + id, getAuth()).success(function(res){
				console.log('hit')
				q.resolve(res);
				console.log(res)
			})
			return q.promise;
		}
		o.editComment = function(id, comment) {
			var q = $q.defer();
			$http.post('/comments/' + id, comment, getAuth()).success(function(res){
				console.log('trying to make request to change comment')
				q.resolve(res);
			})
			return q.promise;
		}
		o.addOne = function(id){
			var q = $q.defer();
			$http.post('/botlle/add/' + id, null, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.subOne = function(id){
			var q = $q.defer();
			$http.post('/botlle/sub/' + id, null, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;

		}
		o.editBotlle = function(id, botlle){
			var q = $q.defer();
			$http.post('/botlle/' + id, botlle, getAuth()).success(function(res){
				q.resolve();
			})
			return q.promise;
		}
		o.deleteBotlle = function(id){
			var q = $q.defer();
			$http.post('/botlle/delete/' + id, null, getAuth()).success(function(res){
				q.resolve();
			})
			 return q.promise;
		}
		o.addFriend = function(id, userid){
			var q = $q.defer();
			console.log(userid + 'this is user id')
			$http.post('/users/add/friend/' + id + '/' + userid, null, getAuth()).success(function(res){
				q.resolve();
			})
			  return q.promise;
		}
		return o;
	}
})();
