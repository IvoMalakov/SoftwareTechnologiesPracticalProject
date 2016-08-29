'use strict';

issueTrackerSystem.controller('IssueDetailController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {
        let issueId = $routeParams._id,

            getIssueById = function getIssueById(id) {
                issueService.getIssueById(id)
                    .then(function(response) {
                        notificationService.showInfo('Issue taken successful');
                        $scope.issueById = response.data;
                    }, function(error) {
                        notificationService.showError('Reques failed', error.statusText);
                    })
            };

        getIssueById(issueId);
    }
]);