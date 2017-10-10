angular.module('InventoryDirective', [])
.directive("inventoryWidget", function ($http, MainService) {
    return {
        restrict: 'E',
        scope: {
            currentUser: '='
        },
        templateUrl: 'views/inventory.html',
        link: function (scope, element, attr) {
            scope.products = ["breads", "carrots", "diamond"];
            MainService.getInventory(scope.currentUser.name).then(function (inventory) {
                scope.inventory = inventory;
            });
            function getMyInventory(username) {
                MainService.getInventory(username).then(function (inventory) {
                    scope.inventory = inventory;
                });
        	}
            scope.createAuction = function(params) {
                MainService.createAuction({
                    username: scope.currentUser.name,
        			quantity:1,
        			product: "breads",
        			minbid: 100 * Math.random()
                }).then(function (message) {
                    console.log(message);
                });
            }
            getMyInventory(scope.currentUser.name);
            console.log(scope);
        }
    };
});
