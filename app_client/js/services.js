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
				 var payload = '';
				  if (token){
			  		 payload = token.split('.')[1];
					 payload = mywindow.atob(payload);
					 payload = JSON.parse(payload);
				  }
				  return payload;
			};

			var isLoggedIn = function(){
				var token = getToken();
				var payload = parseToken(token);
				if (payload){
				   return (payload.exp > Date.now()/1000);			
				}else{
					return false;
				}
			};
			
			var getUser = function(){
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


		}]);