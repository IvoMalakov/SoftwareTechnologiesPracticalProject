issueTrackerSystem.factory('userService',[
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL) {

        function getCurrentUser() {

        }

        function getAllUsers() {

        }

        function makeAdmin(id) {

        }

        function changePassword(user) {

        }

        function logOut() {

        }

        return {
            getCurrentUser: getCurrentUser,
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin,
            changePassword: changePassword,
            logOut: logOut
        }
    }
]);