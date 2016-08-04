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
		
		.controller('SignupController', ['$scope', '$location','authentication',function($scope, $location, authentication){
			console.log('Running SignupController');
			var user={
				firstName:"",
				lastName: "",
				email:"",
				password:""
			};

			$scope.dataloading = false;
			$scope.user = user;

			$scope.register=function(){
				$scope.dataloading = true;
				authentication.register(user)
				.success(function(data){
						console.log("Registration Successful");
						$location.path('/profile');
					})
				.error(function(err){
						console.log("Registraion failed: "+ err.message);
						alert("Registraion failed: "+ err.message);
						$location.path("/signup");
						$scope.dataloading = false;
					});		
			};

			
		}])

		.controller('ProfileController', ['$scope', function($scope){
			console.log('Running ProfileController');
		}]);
angular.module('MeanApp')
		.constant('baseURL',"http://localhost:3000/")
		.service('authentication', ['$http', 'baseURL', '$window', function($http, baseURL, $window){
			console.log('Running authentication');
			
			var _user={};

			this.setUser = function(user){
				_user = user;
			};
			
			var saveToken=function(token){
				$window.localstorage['mean-app-token'] = token;
			};
			
			this.register = function(user){
				return $http.post('/api/register', user)
				.success(function(data){
					saveToken(data.token);
				});	
				
			};


			this.login = function(user){
				return $http.post('/api/login', user)
				.success(function(data){
					saveToken(data.token);
				});	
				
			};

			this.parseToken = function(token){
				 var payload = '';
				  if (token){
			  		 payload = token.split('.')[1];
					 payload = $window.atob(payload);
					 payload = JSON.parse(payload);
				  }
				  return payload;
			};

			this.isLoggedIn = function(){
				var token = getToken();
				var payload = parseToken(token);
				if (payload){
				   return (payload.exp > Date.now()/1000);			
				}else{
					return false;
				}
			};
			
			this.getUser = function(){
				var token = getToken();
				var payload = parseToken(token);
				if (payload){
				   return {
				   	firstName: payload.firstName,
				   	lastName:  payload.lastName,
				   	email: 	   payload.email
				   };			
				}else{
					return {
					firstName: "",
				   	lastName:  "",
				   	email: 	   ""
					};
				}
			};
			
			

			this.getToken=function(token){
				return $window.localstorage['mean-app-token'];
			};


			this.removeToken = function(){
				$window.localstorage.removeItem('mean-app-token');
			};

			this.logout = function(){
				removeToken();
			};




		}]);