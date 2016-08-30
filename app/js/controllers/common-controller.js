'use strict';

issueTrackerSystem.controller('CommonController', [
    '$scope',
    '$location',
    'userService',
    'notificationService',
    function($scope, $location, userService, notificationService) {

        let filter = function(users, val) {
            let filtered = [];
            angular.forEach(users, function(item) {
                if (item.username.toLowerCase().indexOf(val) === 0) {
                    filtered.push(item);
                }
            });

            return filtered;
        };

        $scope.currentUser = {
            UserName: sessionStorage.userName,
            Id: sessionStorage.userId,
            UserEmail: sessionStorage.userEmail
        };

        $scope.getAllUsers = function(val) {
            userService.getAllUsers()
                .then(function(response) {
                    $scope.allUsers = filter(response, val);
                    console.log($scope.allUsers);
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                })
        }
    }
]);