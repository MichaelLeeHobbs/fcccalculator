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
        var operandTwo = 0.0;
        var operator = undefined;
        var curInput = '';
        var haveDecimal = false;

        // button functions
        $scope.opInput = function (input) {
            switch (input) {
                case 'opAdd':
                case 'opAdd':
                case 'opAdd':
                case 'opAdd':
                case 'opAdd':
            }
            operator = 'opAdd';
        };
        $scope.input = function (input) {
            // validate input and update curInput
            switch (input) {

                case "0":
                    if (curInput.length < 1) {
                        return;
                    }
                case '1':
                    console.log('1');
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    console.log('cis: ' + curInput.length)
                    if (curInput.length < 10) {
                        curInput = curInput + input;
                        $scope.display = curInput;
                    }
                    break;
                case ".":
                    if (curInput.length < 9 && !haveDecimal) {
                        curInput = curInput + input;
                        haveDecimal = true;
                        // this solves the display issue when you only have a single number
                        // and a decimal
                        $scope.display = '.' + $scope.display;
                    }
            }
            console.log('input: ' + input);
            console.log('curInput: ' + curInput);
            //$scope.display = curInput;
            console.log('display: ' + $scope.display);
        }
    }]);
