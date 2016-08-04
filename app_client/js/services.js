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