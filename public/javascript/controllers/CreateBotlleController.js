(function(){
	'use strict'
	angular.module('app').controller('CeateBotlleController', CeateBotlleController);
	CeateBotlleController.$inject = ['$state', 'HomeFactory', '$timeout'];

	function CeateBotlleController($state, HomeFactory, $timeout){
		var vm = this;
		vm.botlle = {}
		vm.class = "fadeInRight"
		vm.CreateBotlle = function(){
			vm.botlle.created = new Date(vm.botlle.created + '-1-1');
			console.log('inside CreateBotlle controller')
			HomeFactory.CreateNewBotlle(vm.botlle).then(function(res){
				console.log('back to the state');
				console.log('this is the res to creating botlle ' + res);
				$timeout(function() {
					$state.go('Home');
					vm.class = "fadeInRight"
				}, 400);

			})
		}
	}

})()
