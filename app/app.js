'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainCtrl'
        })
            .otherwise({redirectTo: '/'});
    }])

    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.display = '1337';
        var operandOne = 0.0;
        var operandTwe = 0.0;
        var input = '';

    }]);
