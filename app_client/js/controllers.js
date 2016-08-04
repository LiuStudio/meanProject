

angular.module('MeanApp')
		
		.controller('NavController', ['$scope', 'authentication', '$location', function($scope, authentication, $location){
			console.log('Running NavController');
			$scope.isLoggedIn = authentication.isLoggedIn();
			$scope.user = authentication.getUser();
			console.log("isloggedin is "+ $scope.isLoggedIn);
			$scope.login = function(){
				console.log("this is not implemented yet");
			};
			$scope.logout = function(){
				authentication.logout();
				$location.path('/');
			};
		}])

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