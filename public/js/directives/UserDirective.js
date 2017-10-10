angular.module('UserDirective', [])
.directive("userWidget", function ($window, MainService) {
    return {
        restrict: 'E',
        scope: {
            currentUser: '='
        },
        templateUrl: 'views/user.html',
        link: function (scope, element, attr) {
            var socket = $window.io();
            socket.on('finish-auction', function(){
                MainService.login(scope.currentUser.name).then(function (user) {
                    scope.currentUser = user;
                });
            });
        }
    };
});
