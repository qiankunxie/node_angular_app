angular.module('InventoryDirective', [])
.directive("inventoryWidget", function ($http, MainService, $mdDialog, $window) {
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
            scope.createAuction = function(minbid, product) {
                MainService.createAuction({
                    username: scope.currentUser.name,
                    quantity: 1,
                    product: product,
                    minbid: minbid
                }).then(function (message) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Alert')
                        .textContent(message)
                        .ok('Got it!')
                    );
                });
            }
            scope.showPrompt = function(ev, product) {
                var confirm = $mdDialog.prompt()
                .title('What to start auction?')
                .placeholder('Minimum Bid Value')
                .ariaLabel('Minimum Bid Value')
                .targetEvent(ev)
                .required(true)
                .ok('Start Auction')
                .cancel('Cancel');

                $mdDialog.show(confirm).then(function(result) {
                    scope.createAuction(result, product);
                });
            };
            getMyInventory(scope.currentUser.name);
            var socket = $window.io();
            socket.on('finish-auction', function(){
                getMyInventory(scope.currentUser.name);
            });
        }
    };
});
