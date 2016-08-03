

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