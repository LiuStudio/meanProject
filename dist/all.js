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



angular.module('MeanApp')
		
		.controller('NavController', ['$scope', 'authentication', '$location', '$state', '$stateParams', function($scope, authentication, $location, $state, $stateParams){
			console.log('Running NavController');
			$scope.isLoggedIn = authentication.isLoggedIn();
			$scope.user = authentication.getUser();
			$scope.userlogin={
				email: "",
				password: ""
			};
			console.log("isloggedin is "+ $scope.isLoggedIn);
			$scope.login = function(){
				authentication.login($scope.userlogin)
				.success(function(data){
					console.log("Login Successful!");
					console.log("state name is "+ $state.current.name);
				
				    if ($state.is('app.profile')){
						$state.reload();
					}else{
						$location.path('/profile');
					}
				})
				.error(function(err){
					console.log("Login failed: "+ err.message);
					alert("Login failed: "+ err.message);
					$location.path("/login");
				});
			};
			$scope.logout = function(){
				authentication.logout();
				if ($state.is('app')){
						$state.reload();
					}else{
						$location.path('/');
					}
				
			};
		}])

		.controller('HomeController', ['$scope', function($scope){
			console.log('Running HomeController');
		}])
		
		.controller('AboutUsController', ['$scope', function($scope){
			console.log('Running AboutusController');
		}])

		.controller('LoginController', ['$scope', 'authentication', '$location', function($scope, authentication, $location){
			console.log('Running LoginController');
			$scope.userlogin={
				email: "",
				password: ""
			};
			$scope.dataloading = false;
			$scope.login = function(){
				$scope.dataloading = true;
				authentication.login($scope.userlogin)
				.success(function(data){
					console.log("Login Successful!");
					$location.path('/profile');
				})
				.error(function(err){
					console.log("Login failed: "+ err.message);
					alert("Login failed: "+ err.message);
					$location.path("/login");
					$scope.dataloading = false;
				});
			};

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

		.controller('ProfileController', ['$scope', 'authentication', 'userProfilesvc', '$location', function($scope, authentication, userProfilesvc, $location){
			console.log('Running ProfileController');
			
			var tokenValid = authentication.isLoggedIn();
			
			
			if (tokenValid){
				userProfilesvc.getProfile()
				.success(function(data){
					$scope.user = data;
				})
				.error(function(err){
					console.log(err);
				});	
			}
			else{
				console.log("User is no longer logged in");
			}
			$scope.tokenValid = tokenValid;
		
		}]);
angular.module('MeanApp')
		//.constant('baseURL',"http://localhost:3000/")
		.service('authentication', ['$http', '$window', function($http, mywindow){
			console.log('Running authentication');
			
			var _user={};

			var setUser = function(user){
				_user = user;
			};
			
			var getToken=function(token){
				return mywindow.localStorage['mean-app-token'];
			};


			var removeToken = function(){
				mywindow.localStorage.removeItem('mean-app-token');
			};
			
			var saveToken=function(token){
				mywindow.localStorage['mean-app-token'] = token;
			};
			
			var register = function(user){
				console.log(user);
				return $http.post('/api/register', user)
				.success(function(data){
					console.log("data is "+data);
					saveToken(data.token);
				});	
				
			};


			var login = function(user){
				return $http.post('/api/login', user)
				.success(function(data){
					saveToken(data.token);
				});	
				
			};

			var parseToken = function(token){
				 var base64Url = '';
				 var base64 = '';
				 var payload = "";
				  if (token){
			  		 base64Url = token.split('.')[1];
					 base64 = mywindow.atob(base64Url);
					 payload = JSON.parse(base64);
				  }
				  return payload;
			};

			var isLoggedIn = function(){
				var token = getToken();
				var payload;
				if(token){
					payload = parseToken(token);
					return (payload.exp > Date.now()/1000);
				}else{
					return false;
				}
			};
			
			var getUser = function(){
				var token = getToken();
				var payload;
				if (token){
					payload = parseToken(token);
					return {
				   		firstname: payload.firstname,
				   		lastname:  payload.lastname,
				   		email: 	   payload.email
				   	};	
				}
				
			};
			
			

		

			var logout = function(){
				removeToken();
			};

			this.setUser = setUser;
			this.getToken = getToken;
			this.removeToken = removeToken;
			this.saveToken = saveToken;
			this.register = register;
			this.login = login;
			this.parseToken = parseToken;
			this.isLoggedIn = isLoggedIn;
			this.getUser = getUser;
			this.logout = logout;


		}])

	.service('userProfilesvc',['$http', 'authentication', function($http, authentication){
		var getProfile = function(){
			var token = authentication.getToken();
			return $http.get('/api/profile',{
				headers:{
					Authorization: 'Bearer '+token
				}
			});
		};

		this.getProfile = getProfile;
	}]);