angular.module('MainCtrl', []).controller('MainController', function($scope, MainService) {

	$scope.model = {
		userName: ''
	};

	$scope.login = function () {
        MainService.login($scope.model.userName)
		.then(function(user){
			$scope.currentUser = user;
		});
	};
})
