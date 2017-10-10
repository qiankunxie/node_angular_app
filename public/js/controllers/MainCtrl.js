angular.module('MainCtrl', []).controller('MainController', function($scope, MainService) {

	$scope.model = {
		userName: ''
	};

	$scope.login = function () {
		if(!$scope.model.userName) {
			return;
		}
        MainService.login($scope.model.userName)
		.then(function(user){
			$scope.currentUser = user;
		});
	};
});
