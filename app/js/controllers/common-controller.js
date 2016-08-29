'use strict';

issueTrackerSystem.controller('CommonController', [
    '$scope',
    function($scope) {

        $scope.currentUser = {
            UserName: sessionStorage.userName,
            Id: sessionStorage.userId,
            UserEmail: sessionStorage.userEmail
        };
    }
]);