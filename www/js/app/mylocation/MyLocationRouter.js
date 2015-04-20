angular.module('ionicapp.mylocation', ['ionic'])
   .config(function ($stateProvider) {
        $stateProvider.state('mylocation', {
            url: '/mylocation',
            controller: "MyLocationCtrl as mylocation",
            templateUrl: 'js/app/mylocation/mylocation.html'
        })
    });
