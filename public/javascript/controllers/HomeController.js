(function(){
	'use strict'
	angular.module('app').controller('HomeController', HomeController);
	HomeController.$inject = ['$state', 'HomeFactory'];

	function HomeController($state, HomeFactory){
		var vm = this;

		HomeFactory.getBotlles().then(function(res) {
			console.log('hitting home controler')
			console.log(res);
			vm.botlles = res;

		});

		vm.addOne = function(id){
			console.log(vm.botlles[id]._id)
			id = vm.botlles[id]._id
			HomeFactory.addOne(id).then(function(res){
				HomeFactory.getBotlles().then(function(res) {
					console.log('hitting home controler')
					console.log(res);
					vm.botlles = res;
				});
			})
		}
		vm.subOne = function(id){
			console.log(vm.botlles[id]._id)
			id = vm.botlles[id]._id
			HomeFactory.subOne(id).then(function(res){
				HomeFactory.getBotlles().then(function(res) {
					console.log('hitting home controler')
					console.log(res);
					vm.botlles = res;
				});
			})
		}
	}

})()
