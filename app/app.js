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
        $scope.display = '0';
        var operator;
        var curInput = '';
        var lastInput;
        var haveDecimal = false;
        var maxDigits = 9;

        // operators
        var operators = {
            ac: function () {
                operator = undefined;
                curInput = '';
                lastInput = undefined;
                haveDecimal = false;
                $scope.display = '0';
            },
            ce: function () {
                curInput = '';
                haveDecimal = false;
                $scope.display = '0';
            },

            eq: function () {
                if (operator !== undefined && curInput.length > 0) {
                    lastInput = operator(parseFloat(curInput));
                    $scope.display = lastInput;

                    curInput = '';
                    haveDecimal = '';
                }
            },
            add: function (operandOne, operandTwo) {
                if (operandTwo === undefined) {
                    return function (operandTwo) {
                        return operandOne + operandTwo;
                    };
                }
                return operandOne + operandTwo;
            },
            sub: function (operandOne, operandTwo) {
                if (operandTwo === undefined) {
                    return function (operandTwo) {
                        return operandOne - operandTwo;
                    };
                }
                return operandOne - operandTwo;
            },
            mul: function (operandOne, operandTwo) {
                if (operandTwo === undefined) {
                    return function (operandTwo) {
                        return operandOne * operandTwo;
                    };
                }
                return operandOne * operandTwo;
            },
            div: function (operandOne, operandTwo) {
                if (operandTwo === undefined) {
                    return function (operandTwo) {
                        return operandOne / operandTwo;
                    };
                }
                return operandOne / operandTwo;
            },
            mod: function (operandOne, operandTwo) {
                if (operandTwo === undefined) {
                    return function (operandTwo) {
                        return operandOne % operandTwo;
                    };
                }
                return operandOne % operandTwo;
            }
        };

        // input processors
        $scope.opInput = function (input) {
            // AC and CE are special cases
            if (input === 'ac') {
                operators[input]();
                return;
            }
            if (input === 'ce') {
                operators[input]();
                return;
            }


            // is curInput valid? if not reject
            if (curInput === '.') {
                return;
            }

            var results;
            // case 1 operator is empty
            if (operator === undefined) {
                lastInput = parseFloat(curInput);
                operator = operators[input](lastInput);
                curInput = '';
                haveDecimal = false;
                //$scope.display = '';
            }
            // case 2 operator is filled and no curInput
            else if (curInput.length === 0) {
                results = operator(lastInput);
                operator = operators[input](results);
                $scope.display = results;

                curInput = '';
                haveDecimal = '';

            }
            // case 3 operator is filled and have curInput
            else {
                results = operator(parseFloat(curInput));
                operator = operators[input](results);
                $scope.display = results;

                curInput = '';
                haveDecimal = '';
            }

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
                    if (curInput.length < maxDigits) {
                        curInput = curInput + input;
                        $scope.display = curInput;
                    }
                    break;
                case ".":
                    if (curInput.length < maxDigits - 1 && !haveDecimal) {
                        curInput = curInput + input;
                        haveDecimal = true;
                        $scope.display = curInput;
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
