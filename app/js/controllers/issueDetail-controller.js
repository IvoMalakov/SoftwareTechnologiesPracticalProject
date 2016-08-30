'use strict';

issueTrackerSystem.controller('IssueDetailController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'commentService',
    'notificationService',
    'PAGE_SIZE',
    function($scope, $location, $routeParams, issueService, commentService, notificationService, PAGE_SIZE) {
        let issueId = $routeParams._id,

            getIssueById = function getIssueById(id) {
                issueService.getIssueById(id)
                    .then(function(response) {
                        notificationService.showInfo('Issue taken successful');
                        $scope.issueById = response.data;
                    }, function(error) {
                        notificationService.showError('Request failed', error.statusText);
                    })
            };

        getIssueById(issueId);

        $scope.getCommentsByIssueId = function getCommentsByIssueId(params) {
            let skippedItems = (params.pageNumber - 1) * PAGE_SIZE;

            commentService.getCommentsByIssueId(skippedItems, PAGE_SIZE, issueId)
                .then(function(response) {
                    //notificationService.showInfo('Comments taken successful');
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
                    $location.path('/issues/' + issueId + '/comments/');
                }, function (error) {
                    notificationService.showError('Request failed!', error.statusText);
                });
        };

        $scope.IssueId = issueId;

        $scope.commentRequestParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        $scope.reloadComments = function() {
            $scope.getCommentsByIssueId($scope.commentRequestParams);
        };

        $scope.getCommentsByIssueId($scope.commentRequestParams);
    }
]);