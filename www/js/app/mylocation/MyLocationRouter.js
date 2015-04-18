angular.module('cashload.depositlocations', ['ionic', 'ngResource'])
   .config(function ($stateProvider) {
        $stateProvider.state('depositlocations', {
            url: '/depositlocations',
            parent: 'menu',
            views: {
                'menuContent': {
                    templateUrl: 'js/app/depositlocations/depositlocations.html',
                    controller: 'DepositLocationsCtrl as depositlocations'
                }
            }
        })
    });
