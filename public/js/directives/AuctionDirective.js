angular.module('AuctionDirective', [])
.directive("auctionWidget", function ($http, $window, MainService) {
    return {
        restrict: 'E',
        scope: {
            currentUser: '='
        },
        templateUrl: 'views/auction.html',
        link: function (scope, element, attr) {
            // init the web socket
            MainService.getAuction().then(function (auction) {
                if (auction) {
                    scope.auction = auction;
                }
            });
            var socket = $window.io();
            socket.on('update', function(obj){
                console.log("Update", obj);
            });
            console.log(scope);
        }
    };
});
