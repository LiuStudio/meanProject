angular.module('MeanApp')
		.constant('baseURL',"http://localhost:3000/")
		.service('authentication', ['$http', 'baseURL', function($http, baseURL){
			console.log('Running authentication');
		}]);