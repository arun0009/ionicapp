angular.module('ionicapp.userpreferences', ['ionic', 'ngResource'])
    .config(function ($stateProvider) {
        $stateProvider.state('userpreferences', {
            url: '/userpreferences',
            controller: 'UserPreferencesCtrl as userpreferences',
            templateUrl: 'js/app/userpreferences/userpreferences.html'
        })
    });
