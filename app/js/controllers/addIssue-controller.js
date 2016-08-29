'use strict';

issueTrackerSystem.controller('AddIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {
        $scope.userOwner = sessionStorage['userName'];

        $scope.addIssue = function(issue) {
            issue.UserOwner = sessionStorage['userName'];

            issueService.addIssue(issue)
                .then(function(response) {
                    notificationService.showInfo('Issue added successful');
                    $location.path('#/');
                }, function(error) {
                    notificationService.showError('Add Issue failed', error.statusText)
                })
        }
    }
]);