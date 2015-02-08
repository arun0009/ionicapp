angular.module('ionicapp.login', ['ionic', 'ngResource'])
    .config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginCtrl as login',
            templateUrl: 'js/app/login/login.html'
        })
    });
