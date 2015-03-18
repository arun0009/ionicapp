angular.module('ionicapp.login')
    .factory('LoginService', function ($rootScope, $firebaseAuth, ENV) {
        var authenticateUserDeferredResponse = {};
        return {
            authenticateUserDeferredRequest: function (username, password) {
                console.log("username is : " + username + " and password is : " + password);
                authenticateUserDeferredResponse = validateUser(username, password);
                $rootScope.username = username;
                return authenticateUserDeferredResponse;
            },

            getAuthenticateUserDeferredResponse: function () {
                return authenticateUserDeferredResponse;
            }
        }

        function validateUser(username, password) {
            var ref = new Firebase(ENV.firebaseURL);
            var auth = $firebaseAuth(ref);
            return auth.$authWithPassword({
                email: username,
                password: password
            }, {
                remember: "sessionOnly"
            });
        }
    });
