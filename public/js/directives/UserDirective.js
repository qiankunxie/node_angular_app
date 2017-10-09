angular.module('UserDirective', [])
.directive("userWidget", function () {
    return {
        restrict: 'E',
        scope: {
            currentUser: '='
        },
        templateUrl: 'views/user.html',
        link: function (scope, element, attr) {
            console.log(scope);
        }
    };
});
