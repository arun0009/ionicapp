var UserPreferencesCtrl = function ($scope, $state, $cordovaPush, $ionicPopup, ENV, UserPreferencesService) {

    this.enablePushNotifications = function () {
        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": ENV.googleProjectNumber
            };
        }
        else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            }
        }

        $cordovaPush.register(config).then(function (result) {
            console.log("Register success " + result);
            //NOTE : We only get device token for iOS over here, for android it gets a callback so we will handle it in handleAndroid function.
            if (ionic.Platform.isIOS()) {
                registerDeviceTokenForPushNotifications(result);
                $state.go("chat");
            }
        }, function (err) {
            console.log("Register error " + err)
        });
    }

    function registerDeviceTokenForPushNotifications(deviceToken) {
        UserPreferencesService.pushNotificationDeferredRequest(deviceToken).then(function (response) {
            console.log("response from parse push :::::::::: " + response);
            window.localStorage.setItem('launchCount', 1);
        }), function (err) {
            console.log("Error registering device with error :::::::: " + err);
        }
    };

    // Notification Received
    $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
        console.log("Received notification >>>>>>> " + JSON.stringify([notification]));
        if (ionic.Platform.isAndroid()) {
            handleAndroid(notification);
        }
        else if (ionic.Platform.isIOS()) {
            handleIOS(notification);
        }
    });

    // Android Notification Received Handler
    function handleAndroid(notification) {
        console.log("got a notification for android >>>>> : " + notification);
        switch (notification.event) {
            case 'registered':
                console.log("registering with details : " + notification);
                registerDeviceTokenForPushNotifications(notification.regid);
                $state.go("chat");
                break;

            case 'message':
                $ionicPopup.alert({
                    title: 'Message',
                    template: notification.message
                });
                break;

            case 'error':
                $ionicPopup.alert({
                    title: 'GCM Error',
                    template: notification.msg
                });
                break;

            default:
                $ionicPopup.alert({
                    title: 'GCM Error',
                    template: 'An unknown GCM event has occurred'
                });
                break;
        }
    }

    // IOS Notification Received Handler
    function handleIOS(notification) {
        if (notification.alert) {
            $ionicPopup.alert({
                title: 'Message',
                template: notification.alert
            });
        }

        if (notification.sound) {
            var snd = new Media(notification.sound);
            snd.play();
        }

        if (notification.badge) {
            $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                console.log("Set badge success " + result)
            }, function (err) {
                console.log("Set badge error " + err)
            });
        }
    };

    this.optOutPushNotifications = function () {
        window.localStorage.setItem('launchCount', 1);
        $state.go("chat");
    }

};

angular.module('ionicapp.userpreferences').controller('UserPreferencesCtrl', UserPreferencesCtrl);
