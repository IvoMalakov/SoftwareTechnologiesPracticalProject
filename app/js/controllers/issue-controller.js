'use strict';

issueTrackerSystem.controller('IssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    'authorizationService',
    function($scope, $location, $routeParams, issueService, notificationService, authorizationService) {

        let issueId = $routeParams.id,
            loggedUser = authorizationService.getLoggedUserName();

        $scope.isAdmin = authorizationService.isAdmin();

        $scope.getAllIssues = function() {
            issueService.getAllIssues()
                .then(function(resolve) {
                    notificationService.showInfo('Issues are taken successful');
                    $scope.issuesPreview = true;
                    $scope.allIssues = resolve.data;
                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        }
    }
]);