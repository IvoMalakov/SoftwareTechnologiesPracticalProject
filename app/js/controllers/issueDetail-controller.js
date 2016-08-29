'use strict';

issueTrackerSystem.controller('IssueDetailController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'commentService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, commentService, notificationService) {
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

        function getCommentsByIssueId() {
            commentService.getCommentsByIssueId(issueId)
                .then(function(response) {
                    notificationService.showInfo('Comments taked successful');
                    $scope.comments = response.data;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                })
        };

        $scope.addComment = function addComment(comment) {
            comment.IssueId = issueId;

            commentService.addComment(comment)
                .then(function () {
                    notificationService.showInfo('Comment added successful');
                    $location.path('/issues/');
                }, function (error) {
                    notificationService.showError('Request failed!', error.statusText);
                });
        };

        $scope.IssueId = issueId;

        getCommentsByIssueId();
    }
]);