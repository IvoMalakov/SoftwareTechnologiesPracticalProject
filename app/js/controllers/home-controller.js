'use strict';

issueTrackerSystem.controller('HomeController', [
    '$scope',
    '$location',
    '$window',
    'authenticationService',
    'authorizationService',
    'notificationService',
    'userService',
    function($scope, $location, $window, authenticationService, authorizationService, notificationService, userService) {
        let getCurrentUserInfo = function() {
            userService.getCurrentUser()
                .then(function(currentUser) {
                    sessionStorage['userName'] = currentUser.username;
                    sessionStorage['userId'] = currentUser._id;
                    sessionStorage['userEmail'] = currentUser.email;
                    console.log(sessionStorage);

                    $scope.currentUser = currentUser;
                    $scope.username = currentUser.username;
                    $scope.userEmail = currentUser.email;
                    $scope.userPreview = true;

                    $location.path('#/welcome');

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        };

        $scope.userData = authorizationService;

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