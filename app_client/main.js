var myApp = angular.module('MeanApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('app',{
			url  : '/',
			views:{
				'header@' : {
					templateUrl : 'view/header.html',
					controller  : "NavController"
				},
				'content@':{
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
				'header@' : {
					templateUrl : 'view/header.html',
					controller  : "NavController"
				},
				'content@':{
					templateUrl : "view/aboutus.html",
					controller  : "AboutUsController"
				}
			}
		})
		.state('app.login',{
			url  : 'login',
			views:{
				'header@' : {
					templateUrl : 'view/header.html',
					controller  : "NavController"
				},
				'content@':{
					templateUrl : "view/login.html",
					controller  : "LoginController"
				}
			}
		})

		.state('app.signup',{
			url  : 'signup',
			views:{
				'header@' : {
					templateUrl : 'view/header.html',
					controller  : "NavController"
				},
				'content@':{
					templateUrl : "view/signup.html",
					controller  : "SignupController"
				}
			}
		})
		.state('app.profile',{
			url  : 'profile',
			views:{
				'header@' : {
					templateUrl : 'view/header.html',
					controller  : "NavController"
				},
				'content@':{
					templateUrl : "view/profile.html",
					controller  : "ProfileController"
				}
			}
		});

});
