augular.module('MeanApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('app',{
			url  : '/',
			views:{
				'header' : {
					templateUrl : 'views/header.html'
				},
				'content':{
					templateUrl : "views/home.html"
					controller  : "HomeController"
				},
				'footer' :{
					templateUrl : "views/footer.html"
				}
			}
		})
		
		.state('app.aboutus',{
			url  : 'aboutus',
			views:{
				'content@':{
					templateUrl : "views/aboutus.html"
					controller  : "AboutUsController"
				}
			}
		})
		.state('app.login',{
			url  : 'login',
			views:{
				'content@':{
					templateUrl : "views/login.html"
					controller  : "LoginController"
				}
			}
		})

		.state('app.signup',{
			url  : 'signup',
			views:{
				'content@':{
					templateUrl : "views/signup.html"
					controller  : "SignupController"
				}
			}
		})
		.state('app.profile',{
			url  : 'profile',
			views:{
				'content@':{
					templateUrl : "views/profile.html"
					controller  : "ProfileController"
				}
			}
		})

});
