'use strict';

issueTrackerSystem.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'APP_ID',
    'PAGE_SIZE',
    function($http, $q, BASE_URL, APP_ID, PAGE_SIZE) {

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
                        'Authorization': 'Kinvey ' + sessionStorage['token'],
                        'X-Kinvey-Api-Version': 1
                    },
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