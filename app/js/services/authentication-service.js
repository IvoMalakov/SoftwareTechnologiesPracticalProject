'use strict';

issueTrackerSystem.factory('authenticationService', [
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL) {

        function registerUser(registerUser) {

        }

        function loginUser(loginUser) {

        }

        return {
            loginUser: loginUser,
            registerUser: registerUser
        }
    }
]);