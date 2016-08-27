issueTrackerSystem.factory('userService',[
    '$http',
    '$q',
    'BASE_URL',
    'APP_ID',
    function($http, $q, BASE_URL, APP_ID) {

        function getCurrentUser() {
            let deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'user/' + APP_ID + '/_me',
                    headers: {
                        Authorization: 'Kinvey ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;

        }

        function getAllUsers() {

        }

        function makeAdmin(id) {

        }

        function logOut() {
            let deferred = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'user/' + APP_ID + '/_logout',
                    headers: {
                        Authorization: 'Kinvey ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getCurrentUser: getCurrentUser,
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin,
            logOut: logOut
        }
    }
]);