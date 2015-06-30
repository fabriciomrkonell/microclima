'use strict';

define(['js/index'], function (app) {
	app.controller('user', ['$scope', '$http', function($scope, $http){

		angular.extend($scope, {
			data: {
				id: null,
				fullname: '',
				email: '',
				password: '',
				GroupId: 1
			},
			users: [],
			groups: []
		});

		function getAll(init){
			if(init){
				$http.get('/api/groups').success(function(data){
					$scope.groups = data.data;
				});
			}
			$http.get('/api/users').success(function(data){
				$scope.users = data.data;
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

		$scope.getAll = function(){
			getAll();
		};

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

		$scope.getNameGroup = function(groupId){
			for(var i = 0; i < $scope.groups.length; i++){
				if(groupId == $scope.groups[i].id){
					return $scope.groups[i].description;
				}
			}
			return 'Sem grupo';
		};

	}]);
});