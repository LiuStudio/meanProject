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

			var loginFacebook = function(){
				console.log("at frontend service , get api/facebook")
				return $http.get('api/facebook')
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
			this.loginFacebook = loginFacebook;


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