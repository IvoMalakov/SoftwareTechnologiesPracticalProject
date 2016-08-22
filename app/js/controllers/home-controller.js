'use strict';

issueTrackerSystem.controller('HomeController', [
    '$scope',
    '$location',
    '$window',
    'authenticationService',
    'notificationService',
    'userService',
    function($scope, $location, $window, authenticationService, notificationService, userService) {
        let getCurrentUserInfo = function() {
            userService.getCurrentUser()
                .then(function(currentUser) {
                    sessionStorage['userName'] = currentUser.username;
                    sessionStorage['userId'] = currentUser._id;
                    sessionStorage['sessionId'] = currentUser._kmd.authtoken;

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        };

        $scope.login = function login(user) {
            authenticationService.loginUser(user)
                .then(function(loggedInUser) {
                    notificationService.showInfo('Logged Successful');
                    sessionStorage['token'] = loggedInUser._kmd.authtoken;
                    getCurrentUserInfo();

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        };

        $scope.register = function register(user) {
            authenticationService.registerUser(user)
                .then(function(loggedInUser) {
                    notificationService.showInfo('User has successfully registered');
                    $scope.login(user);

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        };
    }
]);