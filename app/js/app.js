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

        .when('/add', {
            templateUrl: 'views/add-issue.html',
            controller: 'AddIssueController',
            data: {
                requireLogin: true
            }
        })

        .when('/issues', {
            templateUrl: 'views/issues.html',
            controller: 'IssueController'
        })

        .otherwise({redirectTo: '/'})
}]);

issueTrackerSystem.constant('BASE_URL', 'https://baas.kinvey.com/');
issueTrackerSystem.constant('APP_ID', 'kid_SkTcHi_9');
issueTrackerSystem.constant('APP_SECRET', '9b9e8ae960ee448d8a8aa8821ffebb1c');
issueTrackerSystem.constant('MASTER_KEY', 'afacfe7de90e421a9500dfb7e158c02b');
issueTrackerSystem.constant('PAGE_SIZE', 5);