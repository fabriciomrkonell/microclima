'use strict';

angular.module('login-app', ['angular-storage']);

angular.module('login-app').controller('login-ctrl', ['$scope', '$http', 'store', function($scope, $http, store){

	angular.extend($scope, {
		account: {
			username: store.get('sensul_username') || '',
			password: store.get('sensul_password') || ''
		},
		remember: store.get('sensul_remember') || false,
		error: false
	});

	$scope.login = function(account, remember){
		saveStore(account, remember);
		$scope.error = false;
		$http.post('/login', account).success(function(data){
			if(data.error){
				$scope.error = true;
			}else{
				window.location = '/';
			}
		}).error(function(error){
			$scope.error = true;
		});
	};

	function saveStore(account, remember){
		if(remember){
			store.set('sensul_remember', remember);
			store.set('sensul_username', account.username);
			store.set('sensul_password', account.password);
		}else{
			store.set('sensul_remember', '');
			store.set('sensul_username', '');
			store.set('sensul_password', '');
		}
	};

}]);