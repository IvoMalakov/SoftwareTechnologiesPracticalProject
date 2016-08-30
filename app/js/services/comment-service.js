'use strict';

issueTrackerSystem.factory('commentService', [
    '$http',
    '$q',
    'BASE_URL',
    'APP_ID',
    'MASTER_KEY',
    function($http, $q, BASE_URL, APP_ID, MASTER_KEY) {
        let token = APP_ID + ':' + MASTER_KEY;

        function addComment(comment) {
            let deffered = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Comments/',
                    data: JSON.stringify(comment),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Kinvey-Api-Version': 1,
                        'Authorization': 'Basic ' + btoa(token)
                    }
                };

            $http(request)
                .then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function getCommentsByIssueId(skippedItems, pageSize, id) {
            let deffered = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Comments/?query={"IssueId":"' + id + '"}' +
                    '&limit=' + pageSize+ '&skip=' + skippedItems,
                    headers: {
                        'X-Kinvey-Api-Version': 1,
                        'Authorization': 'Basic ' + btoa(token)
                    }
                };

            $http(request)
                .then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        return {
            addComment: addComment,
            getCommentsByIssueId: getCommentsByIssueId
        }
    }
]);