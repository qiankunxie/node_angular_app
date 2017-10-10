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
	function getInventory(username) {
		return $http({
			  url: '/inventory',
			  method: 'GET',
			  params: {
				  username: username
			  }
		}).then(function (response) {
			return response.data;
		});
	}
	function getAuction(username) {
		return $http({
			url: '/auction',
			method: 'GET'
		}).then(function (response) {
			return response.data;
		});
	}
	function createAuction(data) {
		return $http({
			url: '/createauction',
			method: 'POST',
			data: data
		}).then(function (response) {
			return response.data;
		});
	}
	return {
		login: login,
		getInventory: getInventory,
		getAuction: getAuction,
		createAuction: createAuction
	}
}]);
