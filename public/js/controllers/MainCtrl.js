angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.model = {
		userName: ''
	};

	function loginService(username) {
        return $http({
                  url: '/login',
                  method: 'POST',
                  data: {
                      username: username
                  }
              }).then(function (response) {
              	return response.data;
				});
	}

	$scope.login = function () {
        loginService($scope.model.userName)
			.then(function(user){
				$scope.currentUser = user;
			});
	};
})