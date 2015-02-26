angular.module('ionicapp.userpreferences')
    .factory('UserPreferencesService', function ($resource, $rootScope, $cordovaPush, $cordovaDevice, ENV) {
        var pushNotificationDeferredResponse = {};
        return {
            pushNotificationDeferredRequest: function (deviceToken) {
                pushNotificationDeferredResponse = registerDeviceForPushNotification(deviceToken);
                return pushNotificationDeferredResponse;
            },

            getPushNotificationDeferredResponse: function () {
                return pushNotificationDeferredResponse;
            }
        }

        function registerDeviceForPushNotification(deviceToken) {
            console.log("deviceToken is : " + deviceToken);
            var registerDeviceEndpoint = ENV.parseEndpoint + "/1/installations";
            var headers = {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': ENV.parseApplicationId,
                'X-Parse-REST-API-Key': ENV.parseRestApiKey
            };
            var RegisterDeviceResource = $resource(registerDeviceEndpoint, {},
                {
                    'save': {
                        method: 'POST',
                        headers: headers
                    }
                });
            var registerDevice = new RegisterDeviceResource();
            registerDevice.deviceType = ionic.Platform.platform();
            //registerDevice.installationId = $cordovaDevice.getUUID();
            if (ionic.Platform.isAndroid()) {
                registerDevice.GCMSenderId = ENV.googleProjectNumber;
                registerDevice.pushType = "gcm";
            }
            registerDevice.deviceToken = deviceToken;
            registerDevice.channels = [""];
            console.log(angular.toJson(registerDevice));
            return registerDevice.$save();
        }
    });
