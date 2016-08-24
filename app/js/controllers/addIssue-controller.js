'use strict';

issueTrackerSystem.controller('AddIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {
        $scope.userId = $routeParams.id;

        $scope.addIssue = function(issue) {
            issue.userId = $routeParams.id;

            issueService.addIssue(issue)
                .then(function(response) {
                    notificationService.showInfo('Issue added successful');
                    $location.path('#/issues');
                }, function(error) {
                    notificationService.showError('Add Issue failed', error.statusText)
                })
        }
    }
]);