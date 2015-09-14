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
        var operator;
        var curInput = '';
        var lastInput;
        var haveDecimal = false;
        var maxDigits = 9;

        // operators
        var opAC = function () {
            operator = undefined;
            curInput = '';
            lastInput = undefined;
            haveDecimal = false;
            $scope.display = '';
        };

        var opCE = function () {
            curInput = '';
            haveDecimal = false;
            $scope.display = '';
        };

        var opAdd = function (operandOne, operandTwo) {
            if (operandTwo === undefined) {
                return function(operandTwo) {
                    console.log('inner opAdd');
                    return operandOne + operandTwo;
                };
            }
            return operandOne + operandTwo;
        };



        // button functions
        $scope.opInput = function (input) {
            // AC and CE are special cases
            if (input === 'opAC') {
                opAC();
                return;
            }
            if (input === 'opCE') {
                opCE();
                return;
            }


            // is curInput valid? if not reject
            if (curInput === '.') {
                return;
            }

            switch (input) {
                case 'opAdd':
                    // case 1 operator is empty
                    if (operator === undefined) {
                        lastInput = parseFloat(curInput);
                        operator = opAdd(lastInput);
                        curInput = '';
                        haveDecimal = false;
                        $scope.display = '';
                    }
                    // case 2 operator is filled and no curInput
                    else if (curInput.length === 0) {
                        var results = operator(lastInput);
                        operator = opAdd(results);
                        $scope.display = results;

                        curInput = '';
                        haveDecimal = '';

                    }
                    // case 3 operator is filled and have curInput
                    else {
                        var results = operator(parseFloat(curInput));
                        operator = opAdd(results);
                        $scope.display = results;

                        curInput = '';
                        haveDecimal = '';
                    }
                case 'opSub':
                case 'opMul':
                case 'opDiv':
                case 'opMod':
                case 'opAC':
                case 'opCE':
            }
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
                    if (curInput.length < maxDigits) {
                        curInput = curInput + input;
                        $scope.display = curInput;
                    }
                    break;
                case ".":
                    if (curInput.length < maxDigits - 1 && !haveDecimal) {
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
