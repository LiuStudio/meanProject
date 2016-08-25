angular.module('MeanApp')
	.directive('catTile',function(){
		return {
			restrict: 'A',
			template: '<strong>Hello from directive</strong>'
		}
	});