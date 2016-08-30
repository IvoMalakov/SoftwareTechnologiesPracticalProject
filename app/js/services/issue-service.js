'use strict';

issueTrackerSystem.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'APP_ID',
    'MASTER_KEY',
    function($http, $q, BASE_URL, APP_ID, MASTER_KEY) {
        let token = APP_ID + ':' + MASTER_KEY;

        function addIssue(issue) {
            let deffered = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Issues/',
                    data: JSON.stringify(issue),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Kinvey-Api-Version': 1,
                        'Authorization': 'Kinvey ' + sessionStorage['token']
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

        function getAllIssues(skippedItems, pageSize) {
            let deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Issues/?query={}&limit=' + pageSize+ '&skip=' + skippedItems,
                    headers: {
                        'Authorization': 'Basic ' + btoa(token),
                        'X-Kinvey-Api-Version': 3
                    }
                };

            $http(request)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssueById(id) {
            let deffered = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Issues/' + id,
                    headers: {
                        'X-Kinvey-Api-Version': 3,
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

        function editIssue(issue, id) {
            let deffered = $q.defer(),

                request = {
                    method: 'PUT',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Issues/' + id,
                    data: JSON.stringify(issue),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Kinvey-Api-Version': 1,
                        'Authorization': 'Kinvey ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error)
                });

            return deffered.promise;
        }

        return {
            addIssue: addIssue,
            getAllIssues: getAllIssues,
            getIssueById: getIssueById,
            editIssue: editIssue
        }
    }
]);