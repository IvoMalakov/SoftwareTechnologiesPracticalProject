'use strict';

issueTrackerSystem.controller('CommonController', [
    '$scope',
    '$location',
    'authenticationService',
    'notificationService',
    'userService',
    function($scope, $location, authenticationService, notificationService, userService) {

        $scope.currentUser = {
            UserName: sessionStorage.userName,
            Id: sessionStorage.userId,
            UserEmail: sessionStorage.userEmail
        };
    }
]);