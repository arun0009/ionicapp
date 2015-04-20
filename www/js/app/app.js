angular.module('ionicapp', ['ionic', 'ngCordova', 'firebase', 'ionicapp.login', 'ionicapp.signup', 'ionicapp.userpreferences', 'ionicapp.chat', 'ionicapp.mylocation'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, ENV) {

        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Api-Key"] = ENV.apiKey;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $urlRouterProvider.otherwise('/login');

    }).run(function ($ionicPlatform, ENV) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if (typeof analytics !== "undefined") {
                console.log("got analytics.....");
                analytics.startTrackerWithId(ENV.googleTrackerId);
            } else {
                console.log("Google Analytics Unavailable");
            }
        })
    });
