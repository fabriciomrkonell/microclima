'use strict';

define(['js/index'], function (app) {
  app.controller('profile', ['$scope', '$http', 'Values', function($scope, $http, Values){

    angular.extend($scope, {
      dataUser: {
        id: null,
        fullname: '',
        email: '',
        group: 1
      },
      dataPassword: {},
      groups: Values.groups
    });

    function getAll(){
      $http.get('/api/users/profile').success(function(data){
        $scope.dataUser = data.data;
      });
      $scope.clearPassword();
    };

    $scope.clearPassword = function(){
      angular.extend($scope.dataPassword, {
        lastPassword: '',
        newPassword: ''
      });
    }

    getAll();

    $scope.save = function(user){
      $http.post('/api/users', user).success(function(data){
        getAll();
        alert(data.message);
      });
    };

    $scope.savePassword = function(dataPassword){
      $http.post('/api/users/password', dataPassword).success(function(data){
        $scope.clearPassword();
        alert(data.message);
      });
    };

  }]);
});