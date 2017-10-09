angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdService', 'GeekService'])
.directive("userWidget", function () {
    return {
        restrict: 'E',
        scope: {
            user: '='
        },
        template: '<div>{{user}}</div>',
        link: function (scope, element, attr) {
            console.log(scope);
        }
    };
});
