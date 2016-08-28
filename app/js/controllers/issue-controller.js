'use strict';

issueTrackerSystem.controller('IssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    'authorizationService',
    'PAGE_SIZE',
    function($scope, $location, $routeParams, issueService, notificationService, authorizationService, PAGE_SIZE) {

        let issueId = $routeParams.id,
            loggedUser = authorizationService.getLoggedUserName();

        $scope.isAdmin = authorizationService.isAdmin();
        $scope.showComments = false;

        $scope.show = function() {
            $scope.showComments = !$scope.showComments;
        };

        $scope.getAllIssues = function(params) {
            let skippedItemes = (params.pageNumber - 1) * PAGE_SIZE;

            issueService.getAllIssues(skippedItemes, PAGE_SIZE)
                .then(function(resolve) {
                    notificationService.showInfo('Issues are taken successful');
                    $scope.issuesPreview = true;
                    $scope.allIssues = resolve.data;
                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        };

        $scope.issueRequestParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        $scope.reloadIssues = function() {
            $scope.getAllIssues($scope.issueRequestParams);
        };

        $scope.getAllIssues($scope.issueRequestParams);
    }
]);