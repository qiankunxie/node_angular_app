angular.module('AuctionDirective', [])
.directive("auctionWidget", function ($http) {
    return {
        restrict: 'E',
        scope: {
            currentUser: '='
        },
        templateUrl: 'views/auction.html',
        link: function (scope, element, attr) {
            // scope.products = ["breads", "carrots", "diamond"];
            // function getMyInventory(username) {
            //     return $http({
            //           url: '/inventory',
            //           method: 'GET',
            //           params: {
            //               username: username
            //           }
            //     }).then(function (response) {
            //       	scope.inventory = response.data;
    		// 	});
        	// }
            // getMyInventory(scope.currentUser.name);
            console.log(scope);
        }
    };
});
