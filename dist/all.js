var myApp = angular.module('MeanApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('app',{
			url  : '/',
			views:{
				'header' : {
					templateUrl : 'view/header.html'
				},
				'content':{
					templateUrl : "view/home.html",
					controller  : "HomeController"
				},
				'footer' :{
					templateUrl : "view/footer.html"
				}
			}
		})
		
		.state('app.aboutus',{
			url  : 'aboutus',
			views:{
				'content@':{
					templateUrl : "view/aboutus.html",
					controller  : "AboutUsController"
				}
			}
		})
		.state('app.login',{
			url  : 'login',
			views:{
				'content@':{
					templateUrl : "view/login.html",
					controller  : "LoginController"
				}
			}
		})

		.state('app.signup',{
			url  : 'signup',
			views:{
				'content@':{
					templateUrl : "view/signup.html",
					controller  : "SignupController"
				}
			}
		})
		.state('app.profile',{
			url  : 'profile',
			views:{
				'content@':{
					templateUrl : "view/profile.html",
					controller  : "ProfileController"
				}
			}
		});

});



angular.module('MeanApp')
		
		.controller('HomeController', ['$scope', function($scope){
			console.log('Running HomeController');
		}])
		
		.controller('AboutUsController', ['$scope', function($scope){
			console.log('Running AboutusController');
		}])

		.controller('LoginController', ['$scope', function($scope){
			console.log('Running LoginController');
		}])
		
		.controller('SignupController', ['$scope', 'authentication',function($scope,authentication){
			console.log('Running SignupController');
		}])

		.controller('ProfileController', ['$scope', function($scope){
			console.log('Running ProfileController');
		}]);
angular.module('MeanApp')
		.constant('baseURL',"http://localhost:3000/")
		.service('authentication', ['$http', 'baseURL', function($http, baseURL){
			console.log('Running authentication');
		}]);