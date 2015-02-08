angular.module('ionicapp.userpreferences')
    .factory('UserPreferencesService', function($resource, $rootScope, $cordovaPush, $cordovaDevice, ENV) {
        var pushNotificationDeferredResponse = {};
        return {
            pushNotificationDeferredRequest: function(deviceToken) {
                pushNotificationDeferredResponse = registerDeviceForPushNotification(deviceToken);
                return pushNotificationDeferredResponse;
            },

            getPushNotificationDeferredResponse: function() {
                return pushNotificationDeferredResponse;
            }
        }

        function registerDeviceForPushNotification(deviceToken) {
            console.log("deviceToken is : " + deviceToken);
            var registerDeviceEndpoint = ENV.parseEndpoint + "/1/installations";
            var RegisterDeviceResource = $resource(registerDeviceEndpoint, {
                'save': {
                    method: 'POST',
                    headers: {
                        "X-Parse-Application-Id": ENV.parseApplicationId,
                        "X-Parse-REST-API-Key"  : ENV.parseRestApiKey  
                    }
                }
            });
            var registerDevice = new RegisterDeviceResource();
            registerDevice.deviceType = ionic.Platform.getPlatform();
            registerDevice.installationId = $cordovaDevice.getUUID();
            registerDevice.deviceToken = deviceToken;
            console.log(angular.toJson(registerDevice));
            return registerDevice.save({}, request);
        }
    });
