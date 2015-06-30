'use strict';

define(['js/index'], function (app) {
	app.controller('group', ['$scope', '$http', function($scope, $http){

		angular.extend($scope, {
			data: {
				id: null,
				description: ''
			},
			groups: []
		});

		function getAll(){
			$http.get('/api/groups').success(function(data){
				$scope.groups = data.data;
			});
			angular.extend($scope.data, {
				id: null,
				description: ''
			});
		};

		getAll();

		$scope.getAll = function(){
			getAll();
		};

		$scope.save = function(group){
			$http.post('/api/groups', group).success(function(){
				getAll();
			});
		};

		$scope.edit = function(group){
			$scope.data = group;
		};

		$scope.delete = function(group){
			$http.delete('/api/groups/' + group).success(function(){
				getAll();
			});
		};

	}]);
});