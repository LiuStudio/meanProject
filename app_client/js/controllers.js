

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