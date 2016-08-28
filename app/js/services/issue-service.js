'use strict';

issueTrackerSystem.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'APP_ID',
    'MASTER_KEY',
    'PAGE_SIZE',
    function($http, $q, BASE_URL, APP_ID, MASTER_KEY, PAGE_SIZE) {
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

        function getAllIssues() {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'appdata/' + APP_ID + '/Issues/',
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

        return {
            addIssue: addIssue,
            getAllIssues: getAllIssues
        }
    }
]);