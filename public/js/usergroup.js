'use strict';

define(['js/index'], function (app) {
	app.controller('usergroup', ['$scope', '$http', function($scope, $http){

		angular.extend($scope, {
			data: {
				id: null,
				fullname: '',
				email: '',
				password: '',
				GroupId: 1
			},
			sensors: []
		});

		function getAll(init){
			if(init){
				$http.get('/api/groups').success(function(data){
					$scope.groups = data.data;
				});
			}
			$http.get('/api/users').success(function(data){
				$scope.sensors = data.data;
			});
			angular.extend($scope.data, {
				id: null,
				fullname: '',
				email: '',
				password: '',
				GroupId: 1
			});
		};

		getAll(true);

		$scope.save = function(user){
			$http.post('/api/users', user).success(function(){
				getAll(false);
			});
		};

		$scope.edit = function(user){
			$scope.data = user;
		};

		$scope.delete = function(user){
			$http.delete('/api/users/' + user).success(function(){
				getAll(false);
			});
		};

	}]);
});