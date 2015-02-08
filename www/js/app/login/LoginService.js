angular.module('ionicapp.login')
    .factory('LoginService', function ($resource, $cordovaDevice, ENV) {
        var authenticateUserDeferredResponse = {};
        return {
            authenticateUserDeferredRequest: function (username, password) {
                console.log("username is : " + username + " and password is : " +password);
                authenticateUserDeferredResponse = validateUser(username, password);
                return authenticateUserDeferredResponse;
            },

            getAuthenticateUserDeferredResponse: function () {
                return authenticateUserDeferredResponse;
            }
        }

        function validateUser(username, password) {
            var authenticateUserEndpoint = ENV.apiEndpoint + ENV.authenticateUserEndpoint;
            var AuthenticateUserResource = $resource(authenticateUserEndpoint);

            var userCredentials = new AuthenticateUserResource();
            userCredentials.username = username;
            userCredentials.password = password;
            userCredentials.device_id = deviceUUID();
            userCredentials.device_type = ionic.Platform.platform();
            console.log(angular.toJson(userCredentials));
            return userCredentials.$save();
        }

        function deviceUUID(){
            var deviceUUID = 'emualator';
            try {
                deviceUUID = $cordovaDevice.getUUID();

            } catch(err) {
                console.log("unable to get device uuid " + err);
            }
            return deviceUUID;
        }

    });
