'use strict';

issueTrackerSystem.controller('EditIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {
        let issueId = $routeParams._id;

        function getIssueById(id) {
            issueService.getIssueById(id)
                .then(function(response) {
                    $scope.issue = response.data;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                })
        }

        $scope.editIssue = function editIssue(issue) {
            let issueForEdit = {
                Title: issue.Title,
                Description: issue.Description,
                Author: issue.Author,
                DueDate: issue.DueDate,
                State: issue.State,
                UserOwner: issue.UserOwner
            };

            issueService.editIssue(issueForEdit, issueId)
                .then(function(response) {
                    notificationService.showInfo('Issue edited successful');
                    $location.path('/issues/' + issueId);
                }, function(error) {
                    notificationService.showError('Edit issue request failed', error.statusText);
                })
        };

        getIssueById(issueId);
    }
]);