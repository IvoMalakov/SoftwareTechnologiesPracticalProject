'use strict';

issueTrackerSystem.factory('authenticationService', [
    '$http',
    '$q',
    'BASE_URL',
    'APP_ID',
    'APP_SECRET',
    function($http, $q, BASE_URL, APP_ID, APP_SECRET) {
        let token = APP_ID + ':' + APP_SECRET;

        function registerUser(registerUser) {
            let deffered = $q.defer(),

                username = registerUser.username,
                password = registerUser.userPassword,
                email = registerUser.userEmail,

                request = {
                    method: 'POST',
                    url: BASE_URL + 'user/' + APP_ID + '/',
                    data: JSON.stringify({
                        username : username,
                        password : password,
                        email : email
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-VersionKinvey-Api-': 1,
                        'Authorization': 'Basic ' + btoa(token)
                    }
                };

            $http(request)
                .then(function(response) {
                    deffered.resolve(response.data);
                }, function(error) {
                    deffered.reject(error.data)
                });

            return deffered.promise;

        }

        function loginUser(loginUser) {
            let deffered = $q.defer(),

                username = loginUser.username,
                password = loginUser.userPassword,

                request = {
                    method: 'POST',
                    url: BASE_URL + 'user/' + APP_ID + '/login',
                    data: JSON.stringify({
                        username : username,
                        password : password
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Kinvey-Api-Version': 1,
                        'Authorization': 'Basic ' + btoa(token)
                    }
                };

            $http(request)
                .then(function(response) {
                    deffered.resolve(response.data);
                }, function(error) {
                    deffered.reject(error.data)
                });

            return deffered.promise;

        }

        return {
            loginUser: loginUser,
            registerUser: registerUser
        }
    }
]);