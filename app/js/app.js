'use strict';

var issueTrackerSystem = angular.module('issueTrackerSystem', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.pagination'
]);

issueTrackerSystem.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'HomeController'
        })

        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'HomeController'
        })

        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'UserController',
            data: {
                requireLogin: true
            }
        })

        .otherwise({redirectTo: '/'})
}]);

issueTrackerSystem.constant('BASE_URL', 'https://baas.kinvey.com/');