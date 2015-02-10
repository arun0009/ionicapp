angular.module('ionicapp', ['ionic', 'ngCordova', 'firebase', 'ionicapp.login', 'ionicapp.signup', 'ionicapp.userpreferences'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, ENV) {

        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Api-Key"] = ENV.apiKey;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $urlRouterProvider.otherwise('/login');

    }).run(function ($ionicPlatform, ENV) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if (typeof analytics !== "undefined") {
                analytics.startTrackerWithId(ENV.googleTrackerId);
            } else {
                console.log("Google Analytics Unavailable");
            }
        })
    });
