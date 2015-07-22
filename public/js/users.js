'use strict';

define(['js/index'], function (app) {
	app.controller('users', ['$scope', '$http', 'Values', function($scope, $http, Values){

		angular.extend($scope, {
			data: {},
			users: Values.users,
			groups: Values.groups
		});

		function getAll(){
			$http.get('/api/users').success(function(data){
				$scope.users = data.data;
				angular.extend(Values, {
					users: data.data
				});
			});
			clearUser();
		};

		function clearUser(){
			angular.extend($scope.data, {
				id: null,
				fullname: '',
				email: '',
				password: '',
				group: 1
			});
		}

		$scope.getAll = function(){
			getAll();
		};

		$scope.save = function(user){
			$http.post('/api/users', user).success(function(){
				getAll();
			});
		};

		$scope.edit = function(user){
			$scope.data = user;
		};

		$scope.getNameGroup = function(groupId){
			for(var i = 0; i < Values.groups.length; i++){
				if(groupId == Values.groups[i].id){
					return Values.groups[i].name;
				}
			}
		};

		if($scope.users.length == 0){
			getAll();
		}

	}]);
});