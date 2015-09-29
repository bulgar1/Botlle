(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			contorller: 'HomeController',
			templateUrl: 'views/home.html'
		}).state('CreateBotlle', {
			url: '/createBotlle',
			controller: 'CeateBotlleController',
			templateUrl: 'views/CreateBotlle.html',
			controllerAs: 'vm'
		}).state('BotlleInfo', {
			url: '/botlle/:id',
			controller: 'BotlleInfoController',
			controllerAs: 'vm',
			templateUrl: 'views/BotlleInfo.html'
		}).state('RegisterUser', {
			url: '/register',
			templateUrl: 'views/Register.html'
		}).state('LogIn', {
			url: '/login',
			templateUrl: '/views/Login.html'
		}).state('Profile', {
			url: '/profile',
			templateUrl: 'views/Profile.html',
			controller: 'NavBarController',
			controllerAs: 'vm'
		}).state('EditBotlle', {
			url: '/botlle/edit/:id',
			controller: 'BotlleInfoController',
			controllerAs: 'vm',
			templateUrl: '/views/EditBotlle.html'
		})
		$urlRouterProvider.otherwise('/');
	}
})();
