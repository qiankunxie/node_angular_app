angular.module('MainService', []).factory('MainService', ['$http', function($http) {
	// put all services here since it is a small app
	function login(username) {
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
	return {
		login: login
	}
}]);
