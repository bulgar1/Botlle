(function(){
	'use strict'
	angular.module('app').controller('BotlleInfoController', BotlleInfoController);
	BotlleInfoController.$inject = ['$stateParams', '$state', 'HomeFactory', 'UserFactory', '$timeout']

	function BotlleInfoController($stateParams, $state, HomeFactory, UserFactory, $timeout){
		var vm = this;
		console.log('hitting movieinfo controller')
		vm.botlle = {}
		vm.status = UserFactory.status
		console.log(vm.status)
		vm.class = 'zoomInDown';
		if (!$stateParams.id){
			 $state.go('Home')
			}else{
				HomeFactory.getBotlle($stateParams.id).then(function(res){
					// console.log(res)
					// console.log('made it to getPin function')
					vm.botlle = res
					// console.log(vm.pin)
				})
		}
		vm.deleteComment = function(id){
			// console.log('inside function delete')
			var temp = id;
			// console.log(id)
			id = vm.botlle.comments[id]._id
			// console.log(id)
			// console.log(temp)
			// console.log(vm.pin.comments)
			HomeFactory.deleteComment(id).then(function(res){
				console.log('am i at the splice?.')
				vm.botlle.comments.splice(temp, 1);

			})
		}

		vm.createComment = function() {
			var comment = {
				body: vm.newComment,
				botlle: $stateParams.id
			};
			HomeFactory.createComment(comment).then(function (res) {
				vm.newComment = '';
				// console.log(res);
				// vm.movie.comments.push(res);
				HomeFactory.getBotlle($stateParams.id).then(function (res) {
					vm.botlle = res;
					// console.log(vm.pin);
				});
			})
		}
		vm.editComment = function(id){
			var comment = {
				body: vm.editedComment
			}

			id = vm.botlle.comments[id]._id
			// console.log('this is the comment id ' + id)
			// console.log(vm.editedComment)
			HomeFactory.editComment(id, comment).then(function (res){
				console.log('finished request to change comment')
				HomeFactory.getBotlle(vm.botlle._id).then(function (res){
					vm.botlle = res;
					// console.log(vm.pin);
				})
			})
		}
		vm.editBotlle = function(id){
			var newBotlle = {
				title: vm.newTitle,
				img: vm.newImg,
				desc: vm.newDesc
			}
			// console.log('trying to edit pin')
			// console.log(newPin)
			HomeFactory.editBotlle(id, newBotlle).then(function (res) {
				$timeout(function() {
					$state.go('Home');
					vm.class="zoomInDown"
				}, 400);

			})
		}
		vm.deleteBotlle = function(id){
			// console.log('trying to delete pin')
			// console.log(id)
			HomeFactory.deleteBotlle(id).then(function(res){
				$state.go('Home');
			})
		}
		vm.addFriend = function(id){
			console.log('this is the friend ' + id);
			// console.log(vm.status)
			HomeFactory.addFriend(id, vm.status._id).then(function(res){
				console.log('added friend' + id)
			})
		}

	}
})();
