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
        var operand = undefined;
        var operator = undefined;
        var curInput = '';
        var haveDecimal = false;

        // button functions
        $scope.opInput = function (input) {
            if (input === 'opAC') {
                operand = undefined;
                operator = undefined;
                curInput = '';
                haveDecimal = false;
                $scope.display = '';
                return;
            }
            if (input === 'opCE') {
                curInput = '';
                haveDecimal = false;
                $scope.display = '';
                return;
            }


            // is curInput valid? if not reject
            if (curInput.length < 0 || curInput === '.') {
                return;
            }

            switch (input) {
                case 'opAdd':
                    // sub case curInput is valid

                    // case 1 operand is empty
                    if (operand === undefined) {
                        operand = parseFloat(curInput);
                        operator = input;
                    }
                    // case 2 operand is filled
                    else {

                    }
                case 'opSub':
                case 'opMul':
                case 'opDiv':
                case 'opMod':
                case 'opAC':
                case 'opCE':
            }
            operator = 'opAdd';
        }
        ;
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
    }
    ])
;
