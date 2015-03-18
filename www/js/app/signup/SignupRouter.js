angular.module('ionicapp.signup', ['ionic', 'ngResource'])
    .config(function ($stateProvider) {
        $stateProvider.state('signup', {
            url: '/login',
            controller: 'SignupCtrl as signup',
            templateUrl: 'js/app/signup/signup.html'
        })
    });
