angular.module('AuctionDirective', [])
.directive("auctionWidget", function ($http, $window, MainService, $timeout) {
    return {
        restrict: 'E',
        scope: {
            currentUser: '='
        },
        templateUrl: 'views/auction.html',
        link: function (scope, element, attr) {
            // timer
            scope.counter = 0;
            var mytimeout = null,
                onTimeout = function() {
                    if(scope.counter ===  0) {
                        $timeout.cancel(mytimeout);
                        return;
                    }
                    scope.counter--;
                    mytimeout = $timeout(onTimeout, 1000);
                },
                startTimer = function() {
                    mytimeout = $timeout(onTimeout, 1000);
                },
                initAuction = function (auction) {
                    scope.auction = auction;
                    scope.counter = Math.floor((auction.finishdate - Date.now()) / 1000);
                    $timeout.cancel(mytimeout);
                    startTimer();
                }
            // init the web socket
            MainService.getAuction().then(function (auction) {
                if (auction) {
                    initAuction(auction);
                }
            });
            var socket = $window.io();
            socket.on('update-auction', function(auction){
                initAuction(auction);
            });
        }
    };
});
